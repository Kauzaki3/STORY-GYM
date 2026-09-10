"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Membership", href: "/membership" },
  { label: "Personal Trainer", href: "/personal-trainer" },
  { label: "Classes", href: "/classes" },
  { label: "Facilities", href: "/facilities" },
  {
    label: "Shop",
    href: "/shop",
    dropdown: [
      { label: "Supplements", href: "/shop?category=supplements" },
      { label: "Merch", href: "/shop?category=merch" },
      { label: "Gym Equipment", href: "/shop?category=equipment" },
      { label: "Bundles", href: "/shop?category=bundles" },
    ],
  },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { itemCount, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-xl border-b border-[#f0c040]/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 h-[70px]">
        
        {/* ── Logo ── */}
        <Link
          href="/"
          className="flex items-center gap-0 group shrink-0"
        >
          <span
            className="text-xl tracking-[0.25em] text-white uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontStyle: "italic" }}
          >
            STORY
          </span>
          <span
            className="text-xl tracking-[0.25em] uppercase text-[#f0c040]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontStyle: "italic" }}
          >
            GYM
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="hidden xl:flex items-center gap-0">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              ref={link.dropdown ? dropdownRef : undefined}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => setShopOpen(!shopOpen)}
                    className="flex items-center gap-1 text-[11px] font-bold tracking-[0.18em] text-[#888] hover:text-[#f0c040] transition-colors uppercase px-4 py-3"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${shopOpen ? "rotate-180 text-[#f0c040]" : ""}`} />
                  </button>
                  {shopOpen && (
                    <div className="absolute top-full left-0 mt-2 w-52 glass-panel-gold rounded-none animate-fade-in shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
                      <div className="h-0.5 bg-gradient-to-r from-[#f0c040] to-transparent" />
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setShopOpen(false)}
                          className="block px-5 py-3 text-[11px] font-bold tracking-[0.15em] text-[#888] hover:text-[#f0c040] hover:bg-[rgba(240,192,64,0.05)] transition uppercase"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="text-[11px] font-bold tracking-[0.18em] text-[#888] hover:text-[#f0c040] transition-colors uppercase px-4 py-3 block"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={openDrawer}
            className="relative p-2 text-[#888] hover:text-[#f0c040] transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#f0c040] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          {/* Desktop CTAs */}
          <div className="hidden xl:flex items-center gap-2 ml-2">
            <Link
              href="/free-trial"
              className="btn-ghost text-[10px] px-5 py-2.5"
            >
              Free Trial
            </Link>
            <Link
              href="/membership"
              className="btn-gold text-[10px] px-5 py-2.5"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 top-[70px] bg-[#080808]/98 backdrop-blur-2xl z-40 animate-fade-in overflow-y-auto">
          {/* Gold accent bar */}
          <div className="h-0.5 bg-gradient-to-r from-[#f0c040] via-[#d4a020] to-transparent" />

          <div className="px-6 py-8 space-y-0">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center py-4 text-[13px] font-bold tracking-[0.2em] text-[#888] hover:text-[#f0c040] transition-colors uppercase border-b border-[#1a1a1a]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-5 bg-[#0e0e0e] border-b border-[#1a1a1a]">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-[11px] font-bold tracking-[0.15em] text-[#666] hover:text-[#f0c040] transition uppercase"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-8 space-y-3">
              <Link
                href="/free-trial"
                onClick={() => setMobileOpen(false)}
                className="block text-center btn-ghost text-xs px-5 py-4 w-full"
              >
                Free Trial
              </Link>
              <Link
                href="/membership"
                onClick={() => setMobileOpen(false)}
                className="block text-center btn-gold text-xs px-5 py-4 w-full"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
