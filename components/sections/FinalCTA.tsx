import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden border-t border-[#f0c040]/10">
      {/* BG layers */}
      <div className="absolute inset-0 bg-[#0e0e0e]" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/40" />

      {/* Gold center bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-[0.07] blur-[160px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #f0c040, transparent 70%)" }}
      />

      {/* Red bloom right */}
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] opacity-[0.06] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #e02020, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p
          className="text-[#f0c040] text-[10px] tracking-[0.4em] font-bold mb-6 uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Join the Movement
        </p>

        {/* Headline */}
        <h2
          className="mb-6"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: "clamp(3rem, 9vw, 7rem)",
            lineHeight: 0.88,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
          }}
        >
          READY TO START
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #f0c040 0%, #f8d878 40%, #d4a020 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            YOUR STORY?
          </span>
        </h2>

        {/* Gold divider line */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f0c040]/50 to-transparent" />
        </div>

        <p
          className="text-[#888] text-base md:text-lg mb-12 font-light leading-relaxed"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Bergabung dengan Story Gym hari ini dan capai versi terbaik dari dirimu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#membership" className="btn-gold w-full sm:w-auto px-12 py-4 text-sm">
            Join Membership
          </Link>
          <Link href="/register" className="btn-outline w-full sm:w-auto px-12 py-4 text-sm">
            Daftar Gym
          </Link>
        </div>
      </div>
    </section>
  );
}
