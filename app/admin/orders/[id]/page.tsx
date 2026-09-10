"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, Truck, CreditCard, User, CheckCircle2 } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatPrice } from "@/data";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState("COMPLETED");
  const [saved, setSaved] = useState(false);

  const order = {
    id: params.id || "SG-ORD-1008",
    date: "2026-03-07 10:45",
    customer: {
      name: "Andi Pratama",
      email: "andi@example.com",
      phone: "+62 812-3456-7890",
      address: "Jl. Pettarani No. 88, Kec. Panakkukang, Makassar, Sulawesi Selatan 90231",
    },
    payment: {
      method: "QRIS (Gopay / ShopeePay)",
      status: "SUCCESS",
      paidAt: "2026-03-07 10:46",
    },
    items: [
      { name: "Whey Protein (1 lb - Chocolate)", price: 450000, quantity: 1, subtotal: 450000 },
      { name: "Story Gym Shaker Bottle 750ml", price: 159000, quantity: 1, subtotal: 159000 },
    ],
    subtotal: 609000,
    discount: 159000,
    shippingFee: 0,
    total: 450000,
  };

  const handleUpdateStatus = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Link href="/admin/orders" className="inline-flex items-center text-xs text-gray-400 hover:text-white transition">
        <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Order
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white font-mono">{order.id}</h1>
            <StatusBadge status={status} />
          </div>
          <p className="text-xs text-gray-400 mt-1">Dibuat pada {order.date}</p>
        </div>

        {/* Update Status Bar */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl">
          <label className="text-xs font-bold uppercase text-gray-300 ml-2">Ubah Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="admin-select py-1 text-xs w-36"
          >
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
          <button onClick={handleUpdateStatus} className="admin-btn-primary py-1 px-3 text-xs">
            {saved ? "Tersimpan!" : "Update"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-card overflow-hidden">
            <div className="admin-card-header">
              <h2 className="admin-card-title flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Ordered Products
              </h2>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="font-bold text-white">{item.name}</td>
                    <td>{formatPrice(item.price)}</td>
                    <td>x{item.quantity}</td>
                    <td className="text-right font-bold text-white">{formatPrice(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 border-t border-white/10 space-y-2 text-xs text-right max-w-xs ml-auto">
              <div className="flex justify-between text-gray-400"><span>Subtotal:</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between text-emerald-400"><span>Diskon Promo:</span><span>-{formatPrice(order.discount)}</span></div>
              <div className="flex justify-between text-gray-400"><span>Ongkos Kirim:</span><span>FREE</span></div>
              <div className="flex justify-between font-black text-sm text-white border-t border-white/10 pt-2"><span>Total Bayar:</span><span>{formatPrice(order.total)}</span></div>
            </div>
          </div>
        </div>

        {/* Customer & Payment details */}
        <div className="space-y-6">
          <div className="admin-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2 border-b border-white/10 pb-3">
              <User className="w-4 h-4" /> Customer Information
            </h3>
            <div className="space-y-2 text-xs">
              <p className="font-bold text-white text-sm">{order.customer.name}</p>
              <p className="text-gray-300">{order.customer.phone}</p>
              <p className="text-gray-400">{order.customer.email}</p>
            </div>
          </div>

          <div className="admin-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2 border-b border-white/10 pb-3">
              <Truck className="w-4 h-4" /> Shipping Address
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">{order.customer.address}</p>
          </div>

          <div className="admin-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2 border-b border-white/10 pb-3">
              <CreditCard className="w-4 h-4" /> Payment Details
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span>Metode:</span><span className="font-bold text-white">{order.payment.method}</span></div>
              <div className="flex justify-between"><span>Status:</span><span className="text-emerald-400 font-bold">{order.payment.status}</span></div>
              <div className="flex justify-between text-gray-400"><span>Waktu Bayar:</span><span>{order.payment.paidAt}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
