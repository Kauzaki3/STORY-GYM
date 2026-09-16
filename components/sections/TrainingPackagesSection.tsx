"use client";

import { useState } from "react";
import { ptPackages, duoPackages, formatPrice, getWhatsAppLink } from "@/data";
import { Check, Zap } from "lucide-react";

export default function TrainingPackagesSection() {
  const [activeTab, setActiveTab] = useState<"pt" | "duo">("pt");
  const packages = activeTab === "pt" ? ptPackages : duoPackages;

  return (
    <section id="trainer" className="section-padding bg-[#0e0e0e] relative overflow-hidden">
      {/* Smoke BG */}
      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #e02020, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="section-heading-eyebrow">Training</p>
          <div className="flex justify-center mb-4">
            <div className="gold-line" />
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            TRAIN WITH
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f0c040 0%, #d4a020 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PURPOSE.
            </span>
          </h2>
          <p
            className="text-[#888] text-base max-w-xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
          >
            Latihan lebih terarah dengan personal trainer yang menyesuaikan program
            berdasarkan target dan kemampuanmu.
          </p>
        </div>

        {/* ── SPECIAL OFFER BANNER ── */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="relative overflow-hidden border border-[#f0c040]/30 bg-gradient-to-r from-[#0e0e0e] to-[#1a1408] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Gold glow */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#f0c040] via-[#d4a020] to-transparent"
            />
            <div
              className="absolute -right-10 top-1/2 -translate-y-1/2 w-60 h-60 opacity-[0.08] blur-[80px] pointer-events-none"
              style={{ background: "radial-gradient(circle, #f0c040, transparent 70%)" }}
            />

            <div className="relative z-10 text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <Zap className="w-3.5 h-3.5 text-[#f0c040]" fill="#f0c040" />
                <span
                  className="text-[10px] font-black tracking-[0.25em] text-[#f0c040] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Special Offer
                </span>
              </div>
              <h3
                className="text-2xl md:text-3xl uppercase mb-1"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontStyle: "italic",
                  fontWeight: 900,
                }}
              >
                FREE MEMBERSHIP 1 BULAN
              </h3>
              <p
                className="text-sm text-[#888]"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Untuk setiap pengambilan Personal Trainer / Duo Training
              </p>
            </div>
            <a
              href={getWhatsAppLink("pt")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 btn-gold text-xs px-8 py-3.5 shrink-0"
            >
              Klaim Promo
            </a>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {["pt", "duo"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "pt" | "duo")}
              className={`px-10 py-3.5 text-xs font-bold tracking-[0.18em] uppercase transition-all ${
                activeTab === tab
                  ? "bg-[#f0c040] text-[#080808]"
                  : "bg-[#111] text-[#555] hover:text-[#f0c040] border border-[#2a2a2a] hover:border-[#f0c040]/30"
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontStyle: "italic" }}
            >
              {tab === "pt" ? "Personal Trainer" : "Duo Training"}
            </button>
          ))}
        </div>

        {/* ── PACKAGES ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {packages.map((pkg) => {
            const isPopular = pkg.tag === "POPULAR" || pkg.tag === "BEST VALUE";

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col p-8 transition-all duration-300 ${
                  isPopular ? "card-popular scale-[1.02] z-10" : "card-dark"
                }`}
              >
                {pkg.tag && (
                  <span className="absolute -top-3 right-6 promo-badge">
                    {pkg.tag}
                  </span>
                )}

                <h3
                  className="text-2xl font-black tracking-widest uppercase mb-2 text-white"
                  style={{ fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
                >
                  {pkg.sessions}
                </h3>

                <div className="mb-4 pb-4 border-b border-[#222]">
                  <span
                    className={`text-3xl font-bold ${isPopular ? "text-[#f0c040]" : "text-white"}`}
                    style={{ fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}
                  >
                    {formatPrice(pkg.price)}
                  </span>
                </div>

                {/* Free promo tag */}
                <div className="border border-[#f0c040]/20 bg-[#f0c040]/5 px-3 py-2 mb-5 inline-block w-fit">
                  <span
                    className="text-[10px] font-bold text-[#f0c040] uppercase tracking-wider"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    + FREE 1 MONTH MEMBERSHIP
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#999]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isPopular ? "text-[#f0c040]" : "text-[#555]"}`} />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppLink("pt")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center text-xs py-3.5 ${isPopular ? "btn-gold" : "btn-outline"}`}
                >
                  Daftarkan Sekarang
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
