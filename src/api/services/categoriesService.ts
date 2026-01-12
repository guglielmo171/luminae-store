import apiClient, { apiClientRest } from "../axiosClient";
import type { Category, CategoryCreateReq } from "../types/Category.interface";
import { handleApiCall } from "../utils/apiUtils";

export const categoriesService = {
    getCategories: () => 
        handleApiCall(
            apiClientRest.get<Category[]>("/categories"),
            "getCategories"
        ),
    getCategoryById: (id: string) =>
        handleApiCall(
            apiClient.get<Category>(`/categories/${id}`),
            "getCategoryById"
        ),
        createCategory: (category:CategoryCreateReq)=>
            handleApiCall(
                apiClient.post("/categories",category),
                "createCategory"
            ),
             updateCategory: ({category,id}:{category:CategoryCreateReq,id:number})=>
            handleApiCall(
                apiClient.put(`/categories/${id}`,category),
                "createCategory"
            ),
        deleteCategory: (id: number) =>
            handleApiCall(
                apiClient.delete(`/categories/${id}`),
                "deleteCategory"
            )
}