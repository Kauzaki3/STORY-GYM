import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getProductsByCategory, formatPrice } from "@/data";

export default function BundlesSection() {
  const bundles = getProductsByCategory("bundles").slice(0, 3);

  return (
    <section className="section-padding bg-gym-charcoal border-y border-gym-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.3em] text-gym-silver uppercase mb-4">Exclusive</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">BUNDLES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {bundles.map((bundle) => {
            const savePercent = bundle.originalPrice 
              ? Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)
              : 0;
            
            const isUltimate = bundle.tag === "ULTIMATE";

            return (
              <div 
                key={bundle.slug} 
                className={`relative flex flex-col transition-all ${
                  isUltimate ? "bg-gym-surface border-2 border-gym-silver/40 scale-[1.02] z-10" : "card-dark"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gym-black">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover"
                  />
                  {bundle.tag && (
                    <span className="absolute top-0 right-0 bg-gym-silver text-black text-[9px] font-bold tracking-[0.15em] px-3 py-1.5 uppercase">
                      {bundle.tag}
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-lg font-bold tracking-widest uppercase mb-2">{bundle.name}</h3>
                  <p className="text-xs text-gray-400 mb-6">{bundle.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-2xl font-extrabold">{formatPrice(bundle.price)}</span>
                    {bundle.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">{formatPrice(bundle.originalPrice)}</span>
                    )}
                    {savePercent > 0 && (
                      <span className="block text-[9px] font-bold text-green-400 mt-1 uppercase">
                        You Save {formatPrice((bundle.originalPrice || 0) - bundle.price)} ({savePercent}%)
                      </span>
                    )}
                  </div>
                  
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {bundle.bundleItems?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-gym-silver mt-0.5">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/shop/${bundle.slug}`}
                    className={`flex items-center justify-center gap-2 text-center text-[10px] font-bold tracking-[0.15em] py-3.5 uppercase transition ${
                      isUltimate ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Get Bundle
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
