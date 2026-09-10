"use client";

import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, type Product } from "@/data";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group card-dark flex flex-col">
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="product-image-wrap relative aspect-square bg-gym-surface">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white text-black text-[9px] font-bold tracking-[0.12em] px-2.5 py-1 uppercase">
            {product.tag}
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-gym-silver text-black text-[9px] font-bold tracking-wider px-2 py-1">
            SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[9px] text-gray-500 tracking-[0.15em] uppercase">{product.brand}</p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-xs font-bold tracking-wider uppercase mt-1 group-hover:text-gym-silver transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? "star-filled fill-current" : "text-gray-700"}`}
            />
          ))}
          <span className="text-[9px] text-gray-500 ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-bold text-white">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Stock */}
        <p className="text-[9px] text-gray-600 mt-1">
          {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
        </p>

        {/* Buttons */}
        {!compact && (
          <div className="flex gap-2 mt-auto pt-4">
            <button
              onClick={() => addItem(product, 1, product.sizes?.[0], product.colors?.[0])}
              className="flex-1 btn-ghost text-[9px] flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3 h-3" />
              Add to Cart
            </button>
            <Link
              href={`/shop/${product.slug}`}
              className="flex-1 text-center btn-primary text-[9px] py-2.5"
            >
              Buy Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
