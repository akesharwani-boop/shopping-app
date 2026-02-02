// src/features/products/types/product.types.ts
export type Category = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
};

export type ProductsParams = {
  title?: string;
  categoryId?: number;
  price_min?: number;
  price_max?: number;
  price ?:number;
  offset?: number;
  limit?: number;
};