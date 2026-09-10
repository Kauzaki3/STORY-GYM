"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product, CartItem } from "@/data";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (slug: string, size?: string, color?: string) => void;
  updateQuantity: (slug: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "storygym-cart";

function getKey(slug: string, size?: string, color?: string) {
  return `${slug}-${size || ""}-${color || ""}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = useCallback((product: Product, quantity = 1, size?: string, color?: string) => {
    setItems((prev) => {
      const key = getKey(product.slug, size, color);
      const existing = prev.find(
        (i) => getKey(i.product.slug, i.size, i.color) === key
      );
      if (existing) {
        return prev.map((i) =>
          getKey(i.product.slug, i.size, i.color) === key
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, size, color }];
    });
    setIsDrawerOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, size?: string, color?: string) => {
    const key = getKey(slug, size, color);
    setItems((prev) =>
      prev.filter((i) => getKey(i.product.slug, i.size, i.color) !== key)
    );
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeItem(slug, size, color);
      return;
    }
    const key = getKey(slug, size, color);
    setItems((prev) =>
      prev.map((i) =>
        getKey(i.product.slug, i.size, i.color) === key
          ? { ...i, quantity }
          : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, isDrawerOpen, openDrawer, closeDrawer }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
