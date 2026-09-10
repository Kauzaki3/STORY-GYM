import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: "supplements", name: "SUPPLEMENTS", desc: "Fuel your progress.", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2c3cf?w=600&h=800&fit=crop" },
  { id: "merch", name: "MERCH", desc: "Wear your story.", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop" },
  { id: "equipment", name: "GYM EQUIPMENT", desc: "Train anywhere.", img: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=800&fit=crop" },
  { id: "bundles", name: "BUNDLES", desc: "Everything you need to start.", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop" },
];

export default function StoreSection() {
  return (
    <section className="section-padding bg-gym-black border-y border-gym-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.3em] text-gym-silver uppercase mb-4">Store</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">STORY GYM STORE</h2>
          <p className="text-gray-400 text-base">Train hard. Live strong. Represent your story.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.id}`} className="group relative aspect-[3/4] overflow-hidden block">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold tracking-widest uppercase mb-1">{cat.name}</h3>
                <p className="text-[10px] text-gray-300 mb-6">{cat.desc}</p>
                
                <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.15em] text-white uppercase group-hover:text-gym-silver transition-colors">
                  Shop Now <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
