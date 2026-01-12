import apiClient, { apiClientRest } from "../axiosClient";
import type { Product, ProductUpdateDto } from "../types/Product.interface";
import { handleApiCall } from "../utils/apiUtils";

interface ApiResponsePaginated<T>{
  data:T[],
  hasNextPage:boolean,
  nextCursor:string

}

export const productsService = {
  // getProducts: ({ page }: { page: number }) =>
  //   handleApiCall(
  //     apiClient.get<Product[]>("/products", {
  //       params: { limit: 10, offset: page * 10 },
  //     }),
  //     `getProducts (page: ${page})`
  //   ),
    getProducts: ({ cursor }: { cursor?: number }) =>
  {
    console.log('[API] getProducts called with cursor:', cursor);
    console.log('[API] cursor !== undefined:', cursor !== undefined);
    console.log('[API] params will be:', {
      limit: 10,
      ...(cursor !== undefined && { cursor })
    });

    return  handleApiCall(
      apiClientRest.get<ApiResponsePaginated<Product>>("/products", {
        params: {
        limit: 10,
        ...(cursor !== undefined && { cursor })  // Solo se presente!
      },
      }),
      `getProducts (cursor: ${cursor})`
    )},

  getProductById: (id: string | number) =>
    handleApiCall(
      apiClientRest.get<Product>(`/products/${id}`),
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

    updateProduct: ({product,id}: {product:ProductUpdateDto,id:string}) => 
       handleApiCall(
      apiClient.put<ProductUpdateDto>(`/products/${id}`,product),
      `updateProduct (id: ${id})`
    ),

    createProduct: (product:ProductUpdateDto) => 
       handleApiCall(
      apiClient.post(`/products`,product),
      `createProduct ()`
    ),
    deleteProduct: (id: string | number) =>
      handleApiCall(
        apiClient.delete(`/products/${id}`),
        `deleteProduct (id: ${id})`
      ),
};