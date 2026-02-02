import axios from "axios";
import type { Product, ProductsParams } from "../types/product.types";

const publicAxios = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

export const productsApi = {
  getProducts: (params?: ProductsParams) =>
    publicAxios
      .get<Product[]>("/products", { params })
      .then(res => res.data),

  getProductById: (id: number) =>
    publicAxios
      .get<Product>(`/products/${id}`)
      .then(res => res.data),
};