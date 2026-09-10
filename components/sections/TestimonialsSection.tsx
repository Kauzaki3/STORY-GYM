import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#0e0e0e] relative overflow-hidden">
      {/* Smoke */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] opacity-[0.04] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #f0c040, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="section-heading-eyebrow">Testimonials</p>
          <div className="flex justify-center mb-4">
            <div className="gold-line" />
          </div>
          <h2
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
            REAL PEOPLE.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f0c040 0%, #d4a020 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              REAL STORIES.
            </span>
          </h2>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-8 snap-x">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="card-dark p-8 shrink-0 w-[320px] md:w-[400px] snap-center flex flex-col hover:border-[#f0c040]/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#f0c040]/20 pointer-events-none" />

              <Quote className="w-7 h-7 text-[#f0c040]/20 mb-5" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < t.rating ? "text-[#f0c040] fill-current" : "text-[#333]"}`}
                  />
                ))}
              </div>

              <p
                className="text-sm text-[#999] leading-relaxed mb-8 flex-1"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontStyle: "italic" }}
              >
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#1e1e1e]">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover grayscale"
                />
                <div>
                  <h4
                    className="text-sm font-bold uppercase text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}
                  >
                    {t.name}
                  </h4>
                  <p
                    className="text-[9px] text-[#f0c040]/60 tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {t.goal}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
