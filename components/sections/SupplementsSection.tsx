import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/data";

export default function SupplementsSection() {
  const products = getProductsByCategory("supplements").slice(0, 4);

  return (
    <section className="section-padding bg-gym-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-gym-silver uppercase mb-4">Supplements</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">FUEL YOUR PROGRESS.</h2>
          </div>
          <Link href="/shop?category=supplements" className="btn-outline hidden md:inline-block">
            View All Supplements
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/shop?category=supplements" className="btn-outline w-full block">
            View All Supplements
          </Link>
        </div>
      </div>
    </section>
  );
}
