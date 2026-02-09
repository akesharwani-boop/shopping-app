import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/features/products/types/product.types";

type WishlistContextType = {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<Product[]>([]);

  //  restore on refresh
  useEffect(() => {
    const stored = localStorage.getItem("wishlist-storage");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  //  persist
  useEffect(() => {
    localStorage.setItem("wishlist-storage", JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (product: Product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const removeFromWishlist = (id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const isWishlisted = (id: number) =>
    items.some((p) => p.id === id);

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return ctx;
}
