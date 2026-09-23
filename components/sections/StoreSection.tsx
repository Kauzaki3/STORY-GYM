"use client";

import Link from "next/link";
import { ArrowRight, Dumbbell, ShoppingBag, Package, Zap } from "lucide-react";

const categories = [
  {
    id: "supplements",
    name: "SUPPLEMENTS",
    desc: "Fuel your progress.",
    label: "PROTEIN · CREATINE · VITAMINS",
    icon: Zap,
    img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&h=800&fit=crop",
    accent: "#f0c040",
    gradient: "from-[#1a1200] via-[#080800] to-[#000000]",
  },
  {
    id: "merch",
    name: "MERCH",
    desc: "Wear your story.",
    label: "T-SHIRT · HOODIE · TOPI",
    icon: ShoppingBag,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    accent: "#ffffff",
    gradient: "from-[#111111] via-[#080808] to-[#000000]",
  },
  {
    id: "equipment",
    name: "GYM EQUIPMENT",
    desc: "Train anywhere.",
    label: "DUMBBELL · RESISTANCE · MAT",
    icon: Dumbbell,
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop",
    accent: "#f0c040",
    gradient: "from-[#0d0d0d] via-[#050505] to-[#000000]",
  },
  {
    id: "bundles",
    name: "BUNDLES",
    desc: "Everything you need to start.",
    label: "PAKET HEMAT · BEST VALUE",
    icon: Package,
    img: "https://images.unsplash.com/photo-1593095948071-474c5cc2c3cf?w=600&h=800&fit=crop",
    accent: "#f0c040",
    gradient: "from-[#1a0a00] via-[#0a0500] to-[#000000]",
  },
];

export default function StoreSection() {
  return (
    <section className="section-padding bg-gym-black border-y border-gym-border relative overflow-hidden">
      {/* BG Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #f0c040, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-[10px] font-bold tracking-[0.35em] uppercase mb-4"
            style={{ color: "#f0c040", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Story Gym Store
          </p>
          <div className="flex justify-center mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#f0c040] to-transparent" />
          </div>
          <h2
            className="mb-3"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            STORY GYM{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f0c040 0%, #d4a020 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              STORE.
            </span>
          </h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Train hard. Live strong. Represent your story.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="group relative aspect-[3/4] overflow-hidden block"
                style={{ borderRadius: "2px" }}
              >
                {/* Image */}
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ filter: "grayscale(70%) brightness(0.5)" }}
                />
                {/* hover restore color via CSS override */}
                <style>{`
                  .group:hover img { filter: grayscale(0%) brightness(0.65) !important; }
                `}</style>

                {/* Dark gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-85 group-hover:opacity-70 transition-opacity duration-500`} />

                {/* Gold top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent)` }}
                />

                {/* Corner number */}
                <div
                  className="absolute top-4 right-5 text-[11px] font-black tracking-widest opacity-25 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ color: cat.accent, fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  0{i + 1}
                </div>

                {/* Icon */}
                <div
                  className="absolute top-4 left-5 opacity-40 group-hover:opacity-90 transition-all duration-300 group-hover:scale-110"
                  style={{ color: cat.accent }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p
                    className="text-[8px] font-bold tracking-[0.25em] mb-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0"
                    style={{ color: cat.accent, fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {cat.label}
                  </p>
                  <h3
                    className="uppercase mb-1 text-white"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontStyle: "italic",
                      fontWeight: 900,
                      fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 mb-5 group-hover:text-gray-300 transition-colors">
                    {cat.desc}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: cat.accent }}
                  >
                    <span className="relative">
                      Shop Now
                      <span
                        className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                        style={{ backgroundColor: cat.accent }}
                      />
                    </span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Inset border glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${cat.accent}30` }}
                />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-3 border border-[#f0c040]/30 hover:border-[#f0c040] text-[11px] font-bold tracking-[0.2em] uppercase text-[#f0c040] hover:bg-[#f0c040]/5 transition-all duration-300"
          >
            Lihat Semua Produk <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
