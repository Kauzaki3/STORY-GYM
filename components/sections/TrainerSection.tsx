import Link from "next/link";
import { trainers, getWhatsAppLink } from "@/data";

export default function TrainerSection() {
  return (
    <section className="section-padding bg-gym-black border-y border-[#1a1a1a] relative overflow-hidden">
      {/* Smoke FX */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.03] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #f0c040, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="section-heading-eyebrow">The Coaches</p>
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
            MEET YOUR
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f0c040 0%, #d4a020 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TRAINER.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="group relative overflow-hidden bg-[#0e0e0e] border border-[#1e1e1e] hover:border-[#f0c040]/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                {/* Gold tint on hover */}
                <div className="absolute inset-0 bg-[#f0c040]/0 group-hover:bg-[#f0c040]/5 transition-all duration-500 mix-blend-overlay" />
              </div>

              {/* Gold top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f0c040] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p
                  className="text-[9px] font-bold tracking-[0.25em] text-[#f0c040]/70 uppercase mb-1"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Personal Trainer
                </p>
                <h3
                  className="text-lg font-bold tracking-widest uppercase text-white group-hover:text-[#f0d878] transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontStyle: "italic", fontWeight: 900 }}
                >
                  {trainer.name}
                </h3>

                {/* Hover reveal buttons */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-300 ease-in-out">
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/personal-trainer#${trainer.id}`}
                      className="flex-1 btn-ghost text-center text-[8px] py-2.5"
                    >
                      Profile
                    </Link>
                    <a
                      href={getWhatsAppLink("pt")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-gold text-center text-[8px] py-2.5 px-0"
                    >
                      Book
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
