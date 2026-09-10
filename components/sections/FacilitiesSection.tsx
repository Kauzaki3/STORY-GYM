import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { facilities } from "@/data";

export default function FacilitiesSection() {
  const displayFacilities = facilities.slice(0, 4);

  return (
    <section className="section-padding bg-gym-black relative overflow-hidden">
      {/* Smoke */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #f0c040, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="section-heading-eyebrow">Facilities</p>
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
            BUILT FOR
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f0c040 0%, #d4a020 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              YOUR BEST.
            </span>
          </h2>
          <p
            className="text-[#888] text-base"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
          >
            Equipment premium dan fasilitas lengkap standar internasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {displayFacilities.map((fac) => (
            <Link
              key={fac.id}
              href="/facilities"
              className="facility-card aspect-[16/9] md:aspect-auto md:h-80 group block relative overflow-hidden border border-[#1a1a1a] hover:border-[#f0c040]/30 transition-colors duration-500"
            >
              <img
                src={fac.image}
                alt={fac.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107 grayscale group-hover:grayscale-[0.3]"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                {/* Gold bottom accent */}
                <div className="w-8 h-0.5 bg-[#f0c040] mb-3 translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400" />

                <h3
                  className="text-xl md:text-2xl font-bold tracking-widest uppercase text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontStyle: "italic" }}
                >
                  {fac.name}
                </h3>

                <div className="flex items-center gap-2 text-[#f0c040] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <span
                    className="text-[10px] font-bold tracking-[0.18em] uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Explore Area
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/facilities" className="btn-outline inline-block text-sm">
            View All Facilities
          </Link>
        </div>
      </div>
    </section>
  );
}
