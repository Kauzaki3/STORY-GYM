"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Lock, Loader2, ShieldCheck } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice, products, type CartItem } from "@/data";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: Record<string, string>) => void;
          onPending?: (result: Record<string, string>) => void;
          onError?: (result: Record<string, string>) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

function CheckoutContent() {
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  const buyNowSlug = searchParams.get("buyNow");
  const buyNowQty = parseInt(searchParams.get("qty") || "1", 10);
  const buyNowSize = searchParams.get("size") || undefined;

  let items: CartItem[] = cartItems;
  let subtotal = cartSubtotal;

  if (buyNowSlug) {
    const product = products.find((p) => p.slug === buyNowSlug);
    if (product) {
      items = [{ product, quantity: buyNowQty, size: buyNowSize }];
      subtotal = product.price * buyNowQty;
    }
  }

  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
  });

  // Load Midtrans Snap JS
  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    if (!clientKey) return;

    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
    const snapUrl = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";

    // Check if already loaded
    if (document.querySelector(`script[src="${snapUrl}"]`)) return;

    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePay = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Prepare items for API
      const orderItems = items.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        slug: item.product.slug,
      }));

      // Call our API to create transaction
      const res = await fetch("/api/payment/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: `${formData.address} ${formData.address2}`.trim(),
          city: formData.city,
          postal_code: formData.postalCode,
          items: orderItems,
          subtotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat transaksi");
      }

      // Open Midtrans Snap popup
      if (window.snap) {
        window.snap.pay(data.snap_token, {
          onSuccess: (result) => {
            console.log("Payment success:", result);
            clearCart();
            router.push(
              `/checkout/success?order_id=${data.order_id}&transaction_status=settlement`
            );
          },
          onPending: (result) => {
            console.log("Payment pending:", result);
            router.push(
              `/checkout/success?order_id=${data.order_id}&transaction_status=pending`
            );
          },
          onError: (result) => {
            console.error("Payment error:", result);
            setError("Pembayaran gagal. Silakan coba lagi.");
            setIsLoading(false);
          },
          onClose: () => {
            console.log("Payment popup closed");
            setIsLoading(false);
          },
        });
      } else {
        // Fallback: redirect to Midtrans page
        window.location.href = data.redirect_url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gym-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-gym-silver hover:text-white mb-8 transition"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Store
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold uppercase mb-8">
          CHECKOUT
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Form */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8 border-b border-gym-border pb-4">
              <div
                className={`flex items-center gap-2 ${step === 1 ? "text-white" : "text-gym-silver"}`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 1 ? "bg-gym-red text-white" : "bg-green-600 text-white"}`}
                >
                  {step > 1 ? "✓" : "1"}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Information
                </span>
              </div>
              <div className="w-12 h-px bg-gym-border" />
              <div
                className={`flex items-center gap-2 ${step === 2 ? "text-white" : "text-gym-silver"}`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 2 ? "bg-gym-red text-white" : "bg-gym-surface"}`}
                >
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Payment
                </span>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleNext}>
                <div className="space-y-8 animate-fade-in-up">
                  {/* Contact Info */}
                  <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4">
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none"
                      />
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none"
                      />
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none md:col-span-2"
                      />
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number (WhatsApp)"
                        className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none md:col-span-2"
                      />
                    </div>
                  </section>

                  {/* Shipping Address */}
                  <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address Line 1"
                        className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none md:col-span-2"
                      />
                      <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none md:col-span-2"
                      />
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none"
                      />
                      <input
                        required
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                        className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none"
                      />
                    </div>
                  </section>
                </div>

                <div className="mt-8 pt-8 border-t border-gym-border flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary bg-gym-red hover:bg-red-700 w-full md:w-auto px-12 py-4 text-sm"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <section>
                  <h2 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Payment
                  </h2>

                  {/* Midtrans info */}
                  <div className="bg-[#0e0e0e] border border-[#1e1e1e] p-6 mb-6">
                    <div className="flex items-start gap-4">
                      <ShieldCheck className="w-8 h-8 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1">
                          Pembayaran Aman via Midtrans
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Anda akan diarahkan ke halaman pembayaran resmi
                          Midtrans. Tersedia berbagai metode: QRIS, Transfer
                          Bank (BCA, BNI, Mandiri, BRI), GoPay, ShopeePay, OVO,
                          dan Kartu Kredit/Debit.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer summary */}
                  <div className="bg-[#0e0e0e] border border-[#1e1e1e] p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                        Customer Info
                      </p>
                      <button
                        onClick={() => setStep(1)}
                        className="text-[10px] font-bold tracking-wider text-[#f0c040] hover:text-[#d4a020] uppercase"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-white">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-xs text-gray-400">{formData.email}</p>
                    <p className="text-xs text-gray-400">{formData.phone}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formData.address}
                      {formData.address2 && `, ${formData.address2}`},{" "}
                      {formData.city} {formData.postalCode}
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 mb-4">
                      {error}
                    </div>
                  )}
                </section>

                <div className="pt-4 border-t border-gym-border flex justify-end">
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isLoading}
                    className="btn-primary bg-gym-red hover:bg-red-700 w-full md:w-auto px-12 py-4 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Bayar Sekarang — {formatPrice(subtotal)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-gym-charcoal border border-gym-border p-6 sticky top-24">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gym-border pb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.length === 0 ? (
                  <p className="text-sm text-gray-400">Your cart is empty.</p>
                ) : (
                  items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-16 h-16 bg-gym-black border border-gym-border relative shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <span className="absolute -top-2 -right-2 bg-gym-red text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase">
                          {item.product.name}
                        </h4>
                        {item.size && (
                          <p className="text-[10px] text-gray-400">
                            Size: {item.size}
                          </p>
                        )}
                        <p className="text-xs text-gym-silver mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3 text-sm border-t border-gym-border pt-4 mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-xs">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold border-t border-gym-border pt-4">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {/* Trust badge */}
              <div className="mt-4 pt-4 border-t border-gym-border flex items-center justify-center gap-2 text-[9px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secured by Midtrans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gym-black pt-32 text-center text-white">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

