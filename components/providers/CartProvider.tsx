"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  sizeMl: number;
  unitPrice: number;
  quantity: number;
};

type AddToCartInput = Omit<CartItem, "id" | "quantity"> & {
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: AddToCartInput) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "enzaro_cart_v1";

function normalizeQty(qty?: number) {
  if (!qty || Number.isNaN(qty)) return 1;
  return Math.max(1, Math.min(20, Math.floor(qty)));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) return;
      const safeItems = parsed.filter((item) =>
        Boolean(item?.id && item?.slug && item?.name && item?.image && item?.sizeMl && item?.unitPrice && item?.quantity)
      );
      setItems(safeItems);
    } catch {
      // no-op; fall back to empty cart
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((input: AddToCartInput) => {
    const sizeMl = Number(input.sizeMl);
    const unitPrice = Number(input.unitPrice);
    const qty = normalizeQty(input.quantity);
    const id = `${input.slug}_${sizeMl}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(20, item.quantity + qty),
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id,
          slug: input.slug,
          name: input.name,
          image: input.image,
          sizeMl,
          unitPrice,
          quantity: qty,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((id: string, quantity: number) => {
    const safeQty = Math.max(0, Math.floor(quantity));
    setItems((prev) => {
      if (safeQty <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(20, safeQty),
            }
          : item
      );
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    return {
      items,
      itemCount,
      subtotal,
      addItem,
      updateQty,
      removeItem,
      clearCart,
    };
  }, [items, addItem, updateQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
