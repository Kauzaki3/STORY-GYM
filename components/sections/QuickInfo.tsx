import { Clock, MapPin, Wifi } from "lucide-react";

const info = [
  { icon: Clock, label: "Jam Operasional", value: "07.00 – 24.00" },
  { icon: MapPin, label: "Lokasi", value: "Makassar, Sulawesi Selatan" },
  { icon: Wifi, label: "Fasilitas", value: "AC · Locker · Wifi · Shower" },
];

export default function QuickInfo() {
  return (
    <div className="bg-[#0e0e0e] border-y border-[#f0c040]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1e1e1e]">
        {info.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 px-8 py-5 group"
          >
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-[#f0c040]/20 bg-[#f0c040]/5 group-hover:border-[#f0c040]/50 group-hover:bg-[#f0c040]/10 transition-all">
              <item.icon className="w-4 h-4 text-[#f0c040]" />
            </div>
            <div>
              <p
                className="text-[9px] font-bold tracking-[0.25em] text-[#555] uppercase mb-0.5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {item.label}
              </p>
              <p
                className="text-[13px] font-bold text-[#ccc]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
