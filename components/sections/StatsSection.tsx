import { Calendar, Users, Award, Smile } from "lucide-react";

const stats = [
  {
    id: "days",
    value: "586",
    label: "WORKING DAYS",
    icon: Calendar,
  },
  {
    id: "clients",
    value: "2,036",
    label: "HAPPY CLIENTS",
    icon: Users,
  },
  {
    id: "stories",
    value: "874",
    label: "SUCCESSFUL STORIES",
    icon: Award,
  },
  {
    id: "bodies",
    value: "1,625",
    label: "PERFECT BODIES",
    icon: Smile,
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#111]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 grayscale mix-blend-luminosity"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2070')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-[#1f1f1f]/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
              <div className="mb-4 text-[#fcc424]">
                <stat.icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[11px] font-bold tracking-widest text-[#ccc] uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
