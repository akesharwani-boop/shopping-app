import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import type { ProductsParams } from "../types/product.types";
export const useProductsQuery =(params:ProductsParams)=>{
    return useQuery({
     queryKey:["products", params],   
     queryFn:() =>productsApi.getProducts(params),
     staleTime: 5 * 60 * 1000, // 5 minutes
    })
}