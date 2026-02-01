import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/features/products/types/product.types";

type WishlistState = {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.some((p) => p.id === product.id);

        set({
          items: exists
            ? items.filter((p) => p.id !== product.id)
            : [...items, product],
        });
      },

      removeFromWishlist: (productId) =>
        set({
          items: get().items.filter((p) => p.id !== productId),
        }),

      isWishlisted: (productId) =>
        get().items.some((p) => p.id === productId),
    }),
    {
      name: "wishlist-storage",
    }
  )
);