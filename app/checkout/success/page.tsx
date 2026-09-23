"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "N/A";
  const status = searchParams.get("transaction_status") || "settlement";

  const isPending = status === "pending";

  return (
    <main className="min-h-screen bg-gym-black pt-24 pb-20 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div
            className={`w-20 h-20 ${isPending ? "bg-yellow-500" : "bg-green-500"} rounded-full flex items-center justify-center mx-auto shadow-lg`}
            style={{
              boxShadow: isPending
                ? "0 0 40px rgba(234, 179, 8, 0.3)"
                : "0 0 40px rgba(34, 197, 94, 0.3)",
            }}
          >
            {isPending ? (
              <Package className="w-10 h-10 text-white" />
            ) : (
              <CheckCircle className="w-10 h-10 text-white" />
            )}
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl mb-3"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
          }}
        >
          {isPending ? (
            <>
              MENUNGGU{" "}
              <span style={{ color: "#eab308" }}>PEMBAYARAN</span>
            </>
          ) : (
            <>
              ORDER{" "}
              <span style={{ color: "#22c55e" }}>BERHASIL!</span>
            </>
          )}
        </h1>

        {isPending ? (
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Silakan selesaikan pembayaran Anda sesuai instruksi yang diberikan.
            Status order akan diperbarui otomatis setelah pembayaran dikonfirmasi.
          </p>
        ) : (
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Terima kasih atas pesanan Anda! Pembayaran telah dikonfirmasi dan
            pesanan sedang diproses. Anda akan menerima notifikasi via WhatsApp/email.
          </p>
        )}

        {/* Order Info */}
        <div className="bg-[#0e0e0e] border border-[#1e1e1e] p-6 mb-8 text-left">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1e1e1e]">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
              Order Number
            </span>
            <span className="text-sm font-mono font-bold text-white">
              {orderId}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1e1e1e]">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
              Status
            </span>
            <span
              className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                isPending
                  ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-green-500/10 text-green-500"
              }`}
            >
              {isPending ? "PENDING" : "PAID"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
              Payment Method
            </span>
            <span className="text-sm text-white">Midtrans</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#2a2a2a] hover:border-white/30 text-sm font-bold tracking-wider uppercase text-white hover:bg-white/5 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Kembali ke Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#f0c040] hover:bg-[#d4a020] text-black text-sm font-bold tracking-wider uppercase transition-all duration-300"
          >
            Lanjut Belanja
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gym-black pt-32 text-center text-white">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
