const reasons = [
  {
    id: "01",
    title: "PREMIUM EQUIPMENT",
    desc: "Plates, barbell, dan mesin dengan standar kompetisi. Latihan tanpa batas.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
  },
  {
    id: "02",
    title: "ELITE COACHING",
    desc: "Trainer profesional yang tahu cara menghancurkan plateaumu.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
  },
  {
    id: "03",
    title: "NO COMPROMISE FACILITIES",
    desc: "Locker, shower, dan area yang selalu dalam kondisi prima.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
  },
  {
    id: "04",
    title: "THE BROTHERHOOD",
    desc: "Lingkungan yang akan memaksamu untuk terus maju.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
  },
];

export default function WhyStorySection() {
  return (
    <section className="py-24 bg-[#080808] relative">
      <div className="bg-noise" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <p className="section-heading-eyebrow text-[#ff5100]">The Difference</p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 6rem)",
                lineHeight: 0.85,
                letterSpacing: "0.02em",
              }}
            >
              WHY CHOOSE
              <br />
              <span className="text-[#ff5100]">STORY GYM.</span>
            </h2>
          </div>
          <div className="md:max-w-xs">
            <p className="text-[#888] text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Kami tidak menawarkan jalan pintas. Kami menyediakan arena, alat, dan komunitas agar kamu bisa membangun hasil nyata.
            </p>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-4">
          {reasons.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden bg-[#111] border border-[#222] ${item.colSpan} ${item.rowSpan}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-in-out"
                />
                {/* Heavy Gradients for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <p
                  className="text-xl font-bold text-[#ff5100]"
                  style={{ fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}
                >
                  {item.id}
                </p>

                <div>
                  <h3
                    className="text-2xl font-bold tracking-[0.05em] uppercase mb-2 text-white group-hover:text-[#ff5100] transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-[#aaa] leading-relaxed group-hover:text-white transition-colors max-w-xs"
                    style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 h-1 bg-[#ff5100] w-0 group-hover:w-full transition-all duration-500 ease-out z-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
