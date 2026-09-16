"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star, ShoppingBag, Check } from "lucide-react";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addItem, openDrawer } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Find product
  const product = products.find((p) => p.slug === slug);

  // Handle defaults
  useEffect(() => {
    if (product) {
      if (product.sizes?.length) setSelectedSize(product.sizes[0]);
      if (product.colors?.length) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-gym-black pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black text-white mb-4">Produk Tidak Ditemukan</h1>
        <Link href="/shop" className="btn-outline">Kembali ke Shop</Link>
      </main>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem(product, quantity, selectedSize, selectedColor);
      setIsAdding(false);
      openDrawer();
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gym-charcoal md:bg-gym-black pb-24 md:pt-24">
      {/* Mobile Header Back Button (Shopee style transparent back button over image) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => router.push('/shop')} className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
          <ChevronLeft className="w-6 h-6 -ml-1" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-0 md:px-6">
        <Link href="/shop" className="hidden md:inline-flex items-center text-xs text-gym-silver hover:text-white mb-8 transition">
          <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-12 items-start">
          
          {/* Left: Image Gallery (Full width on mobile like Shopee) */}
          <div className="bg-white md:bg-gym-charcoal md:border md:border-gym-border md:rounded-3xl overflow-hidden aspect-square relative flex items-center justify-center">
            {product.tag && (
              <div className="absolute top-4 right-4 md:top-6 md:left-6 z-10 bg-gym-red text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg">
                {product.tag}
              </div>
            )}
            <img 
              src={product.image || "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800"} 
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right: Product Info (White container on mobile like Shopee) */}
          <div className="bg-gym-black md:bg-transparent p-4 md:p-0 space-y-6">
            
            {/* Price & Title Area */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gym-red mb-1">
                <span className="text-sm font-bold">Rp</span>
                <span className="text-3xl font-bold">{product.price.toLocaleString('id-ID')}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gym-silver line-through ml-2">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded ml-2">
                    {Math.round((1 - product.price/product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              
              <h1 className="text-lg md:text-3xl font-medium text-white leading-tight">
                <span className="bg-gym-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-2 align-middle">MALL</span>
                {product.name}
              </h1>

              <div className="flex items-center gap-4 text-xs md:text-sm pt-2">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                </div>
                <div className="w-px h-3 bg-gray-600" />
                <span className="text-gym-silver">
                  {product.reviews} Penilaian
                </span>
                <div className="w-px h-3 bg-gray-600" />
                <span className="text-white">
                  1,2RB+ Terjual
                </span>
              </div>
            </div>

            {/* Promo / Ongkir Banner */}
            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 text-green-500 rounded flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-green-400">Gratis Ongkir</p>
                <p className="text-[10px] text-gym-silver">Minimal belanja Rp 0. Pengiriman Cepat.</p>
              </div>
            </div>

            <div className="h-2 w-full bg-gym-charcoal -mx-4 md:hidden" /> {/* Divider on mobile */}

            {/* Options */}
            <div className="space-y-6 pt-2">
              
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gym-silver mb-3">Pilih Ukuran</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm rounded border transition-all ${selectedSize === size ? "bg-gym-red/10 border-gym-red text-gym-red font-bold" : "bg-gym-charcoal border-gym-border text-white hover:border-gym-red"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gym-silver mb-3">Pilih Warna</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-sm rounded border transition-all ${selectedColor === color ? "bg-gym-red/10 border-gym-red text-gym-red font-bold" : "bg-gym-charcoal border-gym-border text-white hover:border-gym-red"}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <h3 className="text-xs font-bold text-gym-silver w-16">Jumlah</h3>
                <div className="flex items-center border border-gym-border rounded">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-gym-silver hover:bg-gym-charcoal transition-colors">-</button>
                  <span className="w-10 text-center text-sm font-bold text-white border-x border-gym-border">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gym-silver hover:bg-gym-charcoal transition-colors">+</button>
                </div>
                <p className="text-xs text-gym-silver">Tersisa {product.stock} buah</p>
              </div>
            </div>

            <div className="h-2 w-full bg-gym-charcoal -mx-4 md:hidden" /> {/* Divider on mobile */}

            {/* Description */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-white mb-2">Deskripsi Produk</h3>
              <p className="text-xs md:text-sm text-gym-silver leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            {/* Desktop Actions (Hidden on Mobile, replaced by sticky bar) */}
            <div className="hidden md:flex pt-6 gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-gym-red/10 border border-gym-red text-gym-red hover:bg-gym-red/20 py-4 uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all rounded-lg"
              >
                {isAdding ? "Menambahkan..." : <><ShoppingBag className="w-5 h-5" /> Masukkan Keranjang</>}
              </button>
              <button 
                onClick={() => router.push(`/checkout?buyNow=${product.slug}&qty=${quantity}&size=${selectedSize || ''}&color=${selectedColor || ''}`)}
                className="flex-1 bg-gym-red hover:bg-red-700 text-white py-4 uppercase font-bold tracking-wider transition-all rounded-lg"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shopee/TikTok Style Sticky Bottom Bar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gym-black border-t border-gym-border z-50 px-2 py-2 flex items-center gap-2">
        <button className="flex flex-col items-center justify-center px-3 py-1 text-gym-silver">
          <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <span className="text-[10px]">Chat</span>
        </button>
        <div className="w-px h-8 bg-gym-border" />
        <button onClick={handleAddToCart} className="flex-1 bg-gym-red/10 border border-gym-red text-gym-red text-sm font-bold py-2.5 rounded ml-1 text-center">
          Masukkan Keranjang
        </button>
        <button onClick={() => router.push(`/checkout?buyNow=${product.slug}&qty=${quantity}&size=${selectedSize || ''}&color=${selectedColor || ''}`)} className="flex-1 bg-gym-red text-white text-sm font-bold py-2.5 rounded text-center">
          Beli Sekarang
        </button>
      </div>
    </main>
  );
}
