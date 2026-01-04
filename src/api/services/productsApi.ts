import apiClient from "../axiosClient";
import type { Product } from "../types/Product.interface";
import { handleApiCall } from "../utils/apiUtils";

export const productsService = {
  getProducts: ({ page }: { page: number }) =>
    handleApiCall(
      apiClient.get<Product[]>("/products", {
        params: { limit: 10, offset: page * 10 },
      }),
      `getProducts (page: ${page})`
    ),

  getProductById: (id: string | number) =>
    handleApiCall(
      apiClient.get<Product>(`/products/${id}`),
      `getProductById (id: ${id})`
    ),

  getProductsByCategory: ({ page, id }: { page: number; id: string | number }) =>
    handleApiCall(
      apiClient.get<Product[]>(`/categories/${id}/products`, {
        params: { limit: 10, offset: page * 10 },
      }),
      `getProductsByCategory (catId: ${id}, page: ${page})`
    ),

  getRelatedProducts: (id: string | number) =>
    handleApiCall(
      apiClient.get<Product[]>(`/products/${id}/related`),
      `getRelatedProducts (id: ${id})`,
      [] // Fallback: array vuoto se fallisce
    ),
};