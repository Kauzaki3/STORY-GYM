import { MapPin, Phone, Clock, MessageCircle, Navigation } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    content: (
      <>
        Jl. Andi Djemma No. 1 C<br />
        Banta-Bantaeng, Kec. Rappocini<br />
        Kota Makassar, Sulawesi Selatan 90222
      </>
    ),
  },
  {
    icon: Clock,
    label: "Hours",
    content: (
      <>
        Senin – Minggu<br />
        <span className="text-[#f0c040]">07.00 – 24.00 WITA</span>
      </>
    ),
  },
  {
    icon: Phone,
    label: "Contact",
    content: <>+62 811-4198-999</>,
  },
];

export default function LocationSection() {
  return (
    <section className="section-padding bg-gym-black relative overflow-hidden">
      {/* Smoke */}
      <div
        className="absolute -left-20 top-0 w-[500px] h-[500px] opacity-[0.04] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #f0c040, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Info Column ── */}
          <div>
            <p className="section-heading-eyebrow">Location</p>
            <div className="gold-line mb-6" />
            <h2
              className="mb-10"
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
              FIND{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #f0c040 0%, #d4a020 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                US.
              </span>
            </h2>

            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-5 group">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-[#f0c040]/20 bg-[#f0c040]/5 group-hover:border-[#f0c040]/50 group-hover:bg-[#f0c040]/10 transition-all">
                    <item.icon className="w-4.5 h-4.5 text-[#f0c040]" />
                  </div>
                  <div>
                    <h4
                      className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#555] mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="text-[#999] text-sm leading-relaxed"
                      style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.app.goo.gl/placeholder"
                target="_blank"
                rel="noreferrer"
                className="btn-gold text-center text-sm flex items-center justify-center gap-2 px-8 py-3.5"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href="https://wa.me/6285186849980"
                target="_blank"
                rel="noreferrer"
                className="btn-outline text-center text-sm flex items-center justify-center gap-2 px-8 py-3.5"
              >
                <MessageCircle className="w-4 h-4" />
                Chat WhatsApp
              </a>
            </div>
          </div>

          {/* ── Map Column ── */}
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[400px] border border-[#1e1e1e] overflow-hidden">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#f0c040]/40 z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#f0c040]/20 z-10 pointer-events-none" />

            <iframe 
              src="https://maps.google.com/maps?q=Story%20Gym%20Makassar,%20Jl.%20Andi%20Djemma&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(1) invert(90%) contrast(1.2)" }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
