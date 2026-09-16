import Link from "next/link";
import { products } from "@/data";
import { Star, ShoppingBag } from "lucide-react";

export default function ShopPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-gym-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">Story Gym <span className="text-gym-red">Shop</span></h1>
          <p className="text-gym-silver max-w-2xl text-lg">Peralatan, suplemen, dan pakaian eksklusif Story Gym untuk memaksimalkan latihan Anda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/shop/${product.slug}`} key={product.slug} className="group flex flex-col bg-gym-charcoal border border-gym-border rounded-2xl overflow-hidden hover:border-gym-red transition-all duration-300">
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-gym-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {product.tag}
                  </div>
                )}
                {/* Fallback image if real image is missing. Normally we'd use next/image but img works for mock data */}
                <img 
                  src={product.image || "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800"} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-[10px] text-gym-silver font-bold uppercase tracking-widest mb-2">{product.brand} &middot; {product.category}</p>
                <h3 className="text-lg font-bold text-white uppercase leading-tight mb-2 group-hover:text-gym-red transition-colors">{product.name}</h3>
                
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-gym-silver">({product.reviews})</span>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between">
                  <div>
                    {product.originalPrice && (
                      <p className="text-xs text-gym-silver line-through mb-1">{formatPrice(product.originalPrice)}</p>
                    )}
                    <p className="text-xl font-mono text-white font-bold">{formatPrice(product.price)}</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gym-red/10 text-gym-red flex items-center justify-center group-hover:bg-gym-red group-hover:text-white transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
