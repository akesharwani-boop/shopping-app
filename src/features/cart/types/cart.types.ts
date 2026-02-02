import type { Product } from "@/features/products/types/product.types";

export type CartItem = {
  product: Product;
  quantity: number;
};