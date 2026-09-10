"use client";

import Link from "next/link";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (!isDrawerOpen) return null;

  const shipping = subtotal > 500000 ? 0 : 25000;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 animate-fade-in" onClick={closeDrawer} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-gym-charcoal z-50 animate-slide-in-right flex flex-col border-l border-gym-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gym-border">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Your Cart ({items.length})</h2>
          <button onClick={closeDrawer} className="p-1 text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-500 text-sm mb-4">Your cart is empty</p>
              <button onClick={closeDrawer} className="btn-ghost text-xs">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const key = `${item.product.slug}-${item.size || ""}-${item.color || ""}`;
              return (
                <div key={key} className="flex gap-4 pb-4 border-b border-gym-border">
                  {/* Image */}
                  <div className="w-20 h-20 bg-gym-surface shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold tracking-wider uppercase truncate">{item.product.name}</h3>
                    {(item.size || item.color) && (
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {[item.size, item.color].filter(Boolean).join(" / ")}
                      </p>
                    )}
                    <p className="text-xs text-gym-silver font-bold mt-1">{formatPrice(item.product.price)}</p>
                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1, item.size, item.color)}
                        className="w-6 h-6 border border-gym-border flex items-center justify-center hover:border-white/30 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1, item.size, item.color)}
                        className="w-6 h-6 border border-gym-border flex items-center justify-center hover:border-white/30 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.slug, item.size, item.color)}
                    className="p-1 text-gray-600 hover:text-red-400 transition self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gym-border bg-gym-black space-y-3">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-gym-border">
              <span>TOTAL</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block w-full text-center btn-primary mt-2"
            >
              Checkout
            </Link>
            <button
              onClick={() => { closeDrawer(); }}
              className="block w-full text-center btn-ghost text-[10px] mt-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
