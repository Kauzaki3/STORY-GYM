import Link from "next/link";
import { Zap } from "lucide-react";

export default function PromoSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=85&w=2070&auto=format&fit=crop')",
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-[#080808]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/70 to-[#080808]/40" />

      {/* Gold light bloom */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-[0.08] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #f0c040 0%, transparent 70%)" }}
      />

      {/* Decorative vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#f0c040]/20 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-[#f0c040] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-black" fill="black" />
          </div>
          <span
            className="text-[10px] font-bold tracking-[0.35em] text-[#f0c040] uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Limited Experience
          </span>
        </div>

        <h2
          className="mb-5"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          START YOUR
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #f0c040 0%, #f8d878 50%, #d4a020 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            STORY.
          </span>
        </h2>

        <p
          className="text-[#888] text-base md:text-lg mb-10 max-w-md font-light leading-relaxed"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Rasakan pengalaman latihan di Story Gym sebelum menentukan pilihanmu.
          Gratis. Tanpa komitmen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/free-trial" className="btn-gold inline-block text-sm px-10 py-4">
            Claim Free Trial
          </Link>
          <Link href="/membership" className="btn-outline inline-block text-sm px-10 py-4">
            Lihat Membership
          </Link>
        </div>
      </div>
    </section>
  );
}
