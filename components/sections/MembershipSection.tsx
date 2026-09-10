"use client";

import Link from "next/link";
import { membershipPlans, formatPrice, getWhatsAppLink } from "@/data";
import { Check } from "lucide-react";

export default function MembershipSection() {
  return (
    <section id="membership" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Noise & FX */}
      <div className="bg-noise" />
      <div
        className="absolute bottom-0 right-0 w-3/4 h-1/2 opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, #ff5100, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <p className="section-heading-eyebrow text-[#ff5100]">Invest In Yourself</p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 6rem)",
                lineHeight: 0.85,
                letterSpacing: "0.02em",
              }}
            >
              MEMBERSHIP
              <br />
              <span className="text-[#ff5100]">PLANS.</span>
            </h2>
          </div>
          <div className="md:max-w-xs text-right">
            <p className="text-[#888] text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Pilih komitmenmu. Tidak ada kontrak tersembunyi, hanya hasil nyata.
            </p>
          </div>
        </div>

        {/* Asymmetric Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {membershipPlans.map((plan) => {
            const isBestValue = plan.tag === "BEST VALUE";
            const isPopular = plan.tag === "POPULAR";
            const isJoining = plan.id === "member-card";

            return (
              <div
                key={plan.id}
                className={`group relative flex flex-col p-8 transition-all duration-300 border ${
                  isBestValue
                    ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#1c0900] to-[#0a0a0a] border-[#ff5100]"
                    : isPopular
                    ? "bg-[#111] border-[#ff5100]/50"
                    : "bg-[#0f0f0f] border-[#222]"
                }`}
              >
                {/* Noise for the cards */}
                <div className="bg-noise opacity-50" />

                {/* Glow effect for highlighted cards */}
                {(isBestValue || isPopular) && (
                  <div
                    className="absolute inset-0 opacity-20 blur-2xl pointer-events-none transition-opacity group-hover:opacity-40"
                    style={{ background: "radial-gradient(circle at top left, #ff5100, transparent 70%)" }}
                  />
                )}

                {/* Tag badge */}
                {plan.tag && (
                  <div className="absolute top-0 right-0 bg-[#ff5100] text-white px-4 py-1 text-xs font-bold tracking-widest uppercase z-10" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {plan.tag}
                  </div>
                )}

                <div className={`relative z-10 flex-1 flex flex-col ${isBestValue ? "md:flex-row md:items-center md:justify-between gap-8" : ""}`}>
                  
                  <div className={isBestValue ? "md:w-1/2" : ""}>
                    {/* Plan name */}
                    <h3
                      className={`font-bold tracking-[0.1em] uppercase mb-2 ${isBestValue || isPopular ? "text-white" : "text-[#888]"}`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: isBestValue ? "2rem" : "1.25rem" }}
                    >
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-6">
                      <span
                        className={`font-bold ${isBestValue ? "text-[4rem] text-[#ff5100] leading-none" : "text-4xl text-white"}`}
                        style={{ fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}
                      >
                        {formatPrice(plan.price)}
                      </span>
                    </div>

                    {/* Actions for regular cards */}
                    {!isBestValue && (
                      <div className="mt-8 space-y-3">
                        {!isJoining && (
                          <Link href="/checkout" className={`block w-full text-center text-xs py-4 tracking-widest uppercase font-bold transition-all ${isPopular ? "bg-[#ff5100] text-white hover:bg-[#ff7a33]" : "bg-[#222] text-white hover:bg-[#ff5100]"}`}>
                            JOIN NOW
                          </Link>
                        )}
                        <a href={getWhatsAppLink("membership")} target="_blank" rel="noopener noreferrer" className="block w-full text-center text-xs py-4 border border-[#333] text-[#888] tracking-widest uppercase hover:border-[#ff5100] hover:text-[#ff5100] transition-colors">
                          TANYA ADMIN
                        </a>
                      </div>
                    )}
                  </div>

                  <div className={isBestValue ? "md:w-1/2 flex flex-col justify-between h-full" : ""}>
                    {/* Benefits */}
                    <ul className={`space-y-4 ${isBestValue ? "" : "hidden"}`}>
                      {plan.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#aaa]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                          <Check className="w-5 h-5 text-[#ff5100] flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Actions for Best Value Card */}
                    {isBestValue && (
                      <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Link href="/checkout" className="flex-1 text-center text-sm py-4 bg-[#ff5100] text-white tracking-widest uppercase font-bold hover:bg-[#ff7a33] transition-colors shadow-[0_10px_30px_rgba(255,81,0,0.3)]">
                          JOIN 1 YEAR
                        </Link>
                        <a href={getWhatsAppLink("membership")} target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-sm py-4 border border-[#ff5100]/30 text-white tracking-widest uppercase hover:bg-[#ff5100]/10 transition-colors">
                          KONSULTASI
                        </a>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center border-t border-[#222] pt-8">
          <p
            className="text-[11px] text-[#555] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            *Member card / joining fee Rp75.000 (Satu kali bayar untuk pendaftaran member baru)
          </p>
        </div>
      </div>
    </section>
  );
}
