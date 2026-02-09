// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import type { CartItem } from "../types/cart.types";
// import type { Product } from "@/features/products/types/product.types";

// type CartState = {
//   items: CartItem[];

//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   increaseQty: (productId: number) => void;
//   decreaseQty: (productId: number) => void;
//   clearCart: () => void;
// };

// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       items: [],

//       addToCart: (product) => {
//         const items = get().items;
//         const existing = items.find(
//           (i) => i.product.id === product.id
//         );

//         if (existing) {
//           set({
//             items: items.map((i) =>
//               i.product.id === product.id
//                 ? { ...i, quantity: i.quantity + 1 }
//                 : i
//             ),
//           });
//         } else {
//           set({
//             items: [...items, { product, quantity: 1 }],
//           });
//         }
//       },

//       removeFromCart: (productId) =>
//         set({
//           items: get().items.filter(
//             (i) => i.product.id !== productId
//           ),
//         }),

//       increaseQty: (productId) =>
//         set({
//           items: get().items.map((i) =>
//             i.product.id === productId
//               ? { ...i, quantity: i.quantity + 1 }
//               : i
//           ),
//         }),

//       decreaseQty: (productId) =>
//         set({
//           items: get().items
//             .map((i) =>
//               i.product.id === productId
//                 ? { ...i, quantity: i.quantity - 1 }
//                 : i
//             )
//             .filter((i) => i.quantity > 0),
//         }),

//       clearCart: () => set({ items: [] }),
//     }),
//     {
//       name: "cart-storage",
//     }
//   )
// );