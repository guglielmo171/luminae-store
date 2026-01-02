import apiClient from "../axiosClient";
import type { Product } from "../types/Product.interface";

export const productsService ={
    getProducts:({ page }: { page: number })=>apiClient.get<Product[]>("/products", { params: { limit: 10, offset: (page) * 10 } }),
    getProductById:(id:string|number)=>apiClient.get<Product>(`/products/${id}`),
    getProductsByCategory:({ page,id }: { page: number,id:string|number })=>apiClient.get<Product[]>(`/categories/${id}/products`, { params: { limit: 10, offset: (page) * 10 } }),
    getRelatedProducts:(id:string|number)=>apiClient.get<Product[]>(`/products/${id}/related`),
}