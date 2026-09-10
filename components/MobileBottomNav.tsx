"use client";

import Link from "next/link";
import { Home, CreditCard, ShoppingBag, Calendar, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Membership", href: "/membership", icon: CreditCard },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Classes", href: "/classes", icon: Calendar },
  { label: "Profile", href: "/dashboard", icon: User },
];

export default function MobileBottomNav() {
  const { itemCount, openDrawer } = useCart();

  return (
    <>
      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <button
          onClick={openDrawer}
          className="md:hidden fixed bottom-24 right-4 z-40 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"
          style={{ animation: "pulse-glow 2s infinite" }}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-gym-silver text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        </button>
      )}

      {/* Sticky Free Trial CTA */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 px-4 pb-2">
        <Link
          href="/free-trial"
          className="block w-full text-center bg-white text-black text-[10px] font-bold tracking-[0.2em] py-3 uppercase hover:bg-gym-silver transition"
        >
          Claim Free Trial
        </Link>
      </div>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gym-black/95 backdrop-blur-lg border-t border-gym-border">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-white transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] font-semibold tracking-wider uppercase">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
