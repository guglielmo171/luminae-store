import { apiClientRest } from "../axiosClient";
import type { CreateProductRequest, ProductDto, UpdateProductRequest } from "../types/Product.interface";
import { handleApiCall } from "../utils/apiUtils";

interface ApiResponsePaginated<T>{
  data:T[],
  hasNextPage:boolean,
  nextCursor:string

}

export const productsService = {
    getProducts: ({ cursor,search,sortField,direction }: { cursor?: number,search?:string,sortField?:string,direction?:"forward"|"backward" }) =>
      handleApiCall(
      apiClientRest.get<ApiResponsePaginated<ProductDto>>("/products", {
        params: {
        // limit: 10,
        ...(search && {search}),
        ...(cursor !== undefined && { cursor }),
        ...(sortField && { sortField }),
        ...(direction && { direction })
      },
      }),
      `getProducts (cursor: ${cursor})`
    ),
 getProductsByCategory: ({cursor,catID: id,search,sortField,direction}: {cursor?:number,catID:string|number,search?:string,sortField?:string,direction?:"forward"|"backward"}) =>
    handleApiCall(
      apiClientRest.get<ApiResponsePaginated<ProductDto>>(`/categories/${id}/products`, {
       params: {
        // limit: 10,
        ...(search && {search}),
        ...(cursor !== undefined && { cursor }),
        ...(sortField && { sortField }),
        ...(direction && { direction })
      },
      }),
      `getProductsByCategory (catId: ${id}, cursor: ${cursor})`
    ),
  // getProductsByCategory: ({ page, id }: { page: number; id: string | number }) =>
  //   handleApiCall(
  //     apiClientRest.get<ApiResponsePaginated<Product>>(`/categories/${id}/products`, {
  //       params: { limit: 10, offset: page * 10 },
  //     }),
  //     `getProductsByCategory (catId: ${id}, page: ${page})`
  //   ),
  getProductById: (id: string | number) =>
    handleApiCall(
      apiClientRest.get<ProductDto>(`/products/${id}`),
      `getProductById (id: ${id})`
    ),


  getRelatedProducts: (id: string | number) =>
    handleApiCall(
      apiClientRest.get<ProductDto[]>(`/products/${id}/related`),
      `getRelatedProducts (id: ${id})`,
      [] // Fallback: array vuoto se fallisce
    ),

    updateProduct: ({product,id}: {product:UpdateProductRequest,id:string}) => 
       handleApiCall(
        apiClientRest.patch(`/products/${id}`,product),
      `updateProduct (id: ${id})`
    ),

    createProduct: (product:CreateProductRequest) => 
       handleApiCall(
        apiClientRest.post<ProductDto>(`/products`,product),
      `createProduct ()`
    ),
    deleteProduct: (id: string | number) =>
      handleApiCall(
        apiClientRest.delete(`/products/${id}`),
        `deleteProduct (id: ${id})`
      ),
};