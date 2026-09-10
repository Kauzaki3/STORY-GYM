"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Info, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3);
  };

  if (step === 3) {
    return (
      <main className="min-h-screen bg-gym-black pt-24 pb-12 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black uppercase mb-4">ORDER SUCCESSFUL</h1>
          <p className="text-gray-400 mb-8">Thank you for your purchase. We have received your order and will process it shortly. A confirmation email has been sent to you.</p>
          <Link href="/" className="btn-primary inline-block">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gym-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-xs text-gym-silver hover:text-white mb-8 transition">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Store
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold uppercase mb-8">CHECKOUT</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Form */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8 border-b border-gym-border pb-4">
              <div className={`flex items-center gap-2 ${step === 1 ? 'text-white' : 'text-gym-silver'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 1 ? 'bg-gym-red text-white' : 'bg-gym-surface'}`}>1</span>
                <span className="text-xs font-bold uppercase tracking-wider">Information</span>
              </div>
              <div className="w-12 h-px bg-gym-border" />
              <div className={`flex items-center gap-2 ${step === 2 ? 'text-white' : 'text-gym-silver'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 2 ? 'bg-gym-red text-white' : 'bg-gym-surface'}`}>2</span>
                <span className="text-xs font-bold uppercase tracking-wider">Payment</span>
              </div>
            </div>

            <form onSubmit={handleNext}>
              {step === 1 && (
                <div className="space-y-8 animate-fade-in-up">
                  {/* Contact Info */}
                  <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="text" placeholder="First Name" className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none" />
                      <input required type="text" placeholder="Last Name" className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none" />
                      <input required type="email" placeholder="Email Address" className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none md:col-span-2" />
                      <input required type="tel" placeholder="Phone Number (WhatsApp)" className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none md:col-span-2" />
                    </div>
                  </section>

                  {/* Shipping Address */}
                  <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="text" placeholder="Address Line 1" className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none md:col-span-2" />
                      <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none md:col-span-2" />
                      <input required type="text" placeholder="City" className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none" />
                      <input required type="text" placeholder="Postal Code" className="w-full bg-gym-charcoal border border-gym-border px-4 py-3 text-sm focus:border-gym-red outline-none" />
                    </div>
                  </section>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                  <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Payment Method
                    </h2>
                    <p className="text-xs text-gray-400 mb-4">All transactions are secure and encrypted.</p>
                    
                    <div className="space-y-3">
                      {['QRIS', 'Bank Transfer', 'E-Wallet', 'Credit / Debit Card'].map((method) => (
                        <label key={method} className={`flex items-center gap-4 p-4 border cursor-pointer transition ${paymentMethod === method ? 'border-gym-red bg-gym-red/5' : 'border-gym-border bg-gym-charcoal'}`}>
                          <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="w-4 h-4 accent-gym-red" required />
                          <span className="font-bold text-sm tracking-wide">{method}</span>
                        </label>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-gym-border flex justify-end">
                <button type="submit" className="btn-primary bg-gym-red hover:bg-red-700 w-full md:w-auto px-12 py-4 text-sm">
                  {step === 1 ? "Continue to Payment" : "Complete Order"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-gym-charcoal border border-gym-border p-6 sticky top-24">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gym-border pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.length === 0 ? (
                  <p className="text-sm text-gray-400">Your cart is empty.</p>
                ) : (
                  items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-16 h-16 bg-gym-black border border-gym-border relative shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover opacity-80" />
                        <span className="absolute -top-2 -right-2 bg-gym-red text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase">{item.product.name}</h4>
                        {item.size && <p className="text-[10px] text-gray-400">Size: {item.size}</p>}
                        <p className="text-xs text-gym-silver mt-1">{formatPrice(item.product.price)}</p>
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
                  <span>Calculated next step</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold border-t border-gym-border pt-4">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
