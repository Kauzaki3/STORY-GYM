const stats = [
  { value: "500+", label: "Members" },
  { value: "5+", label: "Expert Coaches" },
  { value: "07–24", label: "Open Everyday" },
  { value: "#1", label: "Premium Gym Makassar" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 bg-[#0a0a0a]">
      {/* Background Noise */}
      <div className="bg-noise" />
      
      {/* Large Orange background glow */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
        style={{ background: "linear-gradient(to left, #ff5100, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
          
          {/* ── Image Column (Overlapping bottom edge) ── */}
          <div className="w-full lg:w-5/12 relative">
            <div className="relative aspect-[3/4] lg:aspect-[4/5] w-full">
              {/* Image Frame */}
              <div className="absolute inset-0 bg-[#ff5100] translate-x-4 translate-y-4 opacity-20 border border-[#ff5100]" />
              
              <div className="relative h-full w-full overflow-hidden border border-[#222]">
                <img
                  src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop"
                  alt="Story Gym intense workout"
                  className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[#ff5100]/5 mix-blend-overlay" />
              </div>
            </div>

            {/* Floating Stats Block (Overlaps image and content) */}
            <div className="absolute -right-8 md:-right-24 bottom-12 bg-[#111] border-l-4 border-[#ff5100] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-20 w-[280px]">
              <div className="bg-noise" />
              <div className="relative z-10 grid grid-cols-2 gap-y-6 gap-x-4">
                {stats.map((stat, i) => (
                  <div key={i} className="text-left">
                    <p
                      className="text-3xl font-bold text-white leading-none mb-1"
                      style={{ fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-[10px] font-bold tracking-[0.1em] text-[#ff5100] uppercase"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Content Column ── */}
          <div className="w-full lg:w-7/12 lg:pl-20 relative z-10">
            <p className="section-heading-eyebrow text-[#ff5100] mb-4">The Story Gym Standard</p>
            
            <h2
              className="mb-8 text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 0.85,
                letterSpacing: "0.02em",
              }}
            >
              WE DON'T DO
              <br />
              <span className="text-[#ff5100]">EXCUSES.</span>
            </h2>

            <div className="w-12 h-[3px] bg-[#ff5100] mb-8" />

            <div className="space-y-6">
              <p
                className="text-[#a0a0a0] text-lg leading-relaxed max-w-xl font-medium"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Story Gym dibangun untuk mereka yang serius mengubah diri. Bukan sekadar tempat singgah, tapi arena untuk membentuk disiplin, kekuatan, dan ketahanan mental.
              </p>

              <p
                className="text-[#777] text-base leading-relaxed max-w-xl"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
              >
                Dari equipment berspesifikasi kompetisi hingga pelatih yang mendorongmu melewati batas nyaman. Lingkungan ini didesain agar kamu tidak bisa mundur.
              </p>
            </div>

            <div className="mt-12">
              <a
                href="https://www.instagram.com/storygym.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2"
              >
                GABUNG KOMUNITAS KAMI
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
