import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const midtransClient = require("midtrans-client");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SG${y}${m}${d}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      city,
      postal_code,
      items,
      subtotal,
    } = body;

    // Validate
    if (!customer_name || !customer_email || !customer_phone || !items?.length) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();
    const totalAmount = subtotal; // Can add shipping_fee later

    // 1. Create order in Supabase
    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address: shipping_address || "",
        city: city || "",
        postal_code: postal_code || "",
        subtotal: totalAmount,
        discount_amount: 0,
        shipping_fee: 0,
        total_amount: totalAmount,
        status: "PENDING",
        payment_method: "MIDTRANS",
        midtrans_order_id: orderNumber,
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json(
        { error: "Gagal membuat order" },
        { status: 500 }
      );
    }

    // 2. Insert order items
    const orderItems = items.map(
      (item: { name: string; price: number; quantity: number; size?: string }) => ({
        order_id: order.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        variant_info: item.size || null,
      })
    );

    await supabase.from("order_items").insert(orderItems);

    // 3. Create Midtrans Snap transaction
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const midtransItems = items.map(
      (item: { name: string; price: number; quantity: number }) => ({
        id: item.name.toLowerCase().replace(/\s+/g, "-"),
        price: item.price,
        quantity: item.quantity,
        name: item.name.substring(0, 50), // Midtrans max 50 chars
      })
    );

    const parameter = {
      transaction_details: {
        order_id: orderNumber,
        gross_amount: totalAmount,
      },
      item_details: midtransItems,
      customer_details: {
        first_name: customer_name,
        email: customer_email,
        phone: customer_phone,
        shipping_address: shipping_address
          ? {
              first_name: customer_name,
              phone: customer_phone,
              address: shipping_address,
              city,
              postal_code,
              country_code: "IDN",
            }
          : undefined,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/checkout/success?order_id=${orderNumber}`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    // 4. Save snap_token to order
    await supabase
      .from("orders")
      .update({ snap_token: transaction.token })
      .eq("id", order.id);

    return NextResponse.json({
      snap_token: transaction.token,
      order_id: orderNumber,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("Midtrans Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
