import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
    } = body;

    // Verify signature from Midtrans
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      console.error("Invalid Midtrans signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    // Determine order status based on Midtrans transaction_status
    let orderStatus: string;

    if (transaction_status === "capture") {
      orderStatus = fraud_status === "accept" ? "PAID" : "PENDING";
    } else if (transaction_status === "settlement") {
      orderStatus = "PAID";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      orderStatus = "CANCELLED";
    } else if (transaction_status === "pending") {
      orderStatus = "PENDING";
    } else {
      orderStatus = "PENDING";
    }

    // Update order in Supabase
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: orderStatus,
        payment_method: payment_type || "MIDTRANS",
        updated_at: new Date().toISOString(),
      })
      .eq("midtrans_order_id", order_id);

    if (updateError) {
      console.error("DB update error:", updateError);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }

    console.log(
      `[Midtrans Webhook] Order ${order_id}: ${transaction_status} → ${orderStatus}`
    );

    // Midtrans expects HTTP 200 response
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
