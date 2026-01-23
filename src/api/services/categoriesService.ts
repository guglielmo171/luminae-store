import { apiClientRest } from "../axiosClient";
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from "../types/Category.interface";
import { handleApiCall } from "../utils/apiUtils";


export interface ResponseCategoryList{
    data:Category[],
    total:number
} 

export const categoriesService = {
    getCategories: () => 
        handleApiCall(
            apiClientRest.get<ResponseCategoryList>("/categories"),
            "getCategories"
        ),
    getCategoryById: (id: string) =>
        handleApiCall(
            apiClientRest.get<Category>(`/categories/${id}`),
            "getCategoryById"
        ),
        createCategory: (category:CreateCategoryRequest)=>
            handleApiCall(
                apiClientRest.post("/categories",category),
                "createCategory"
            ),
             updateCategory: ({category,id}:{category:UpdateCategoryRequest,id:number})=>
            handleApiCall(
                apiClientRest.patch(`/categories/${id}`,category),
                "updateCategory"
            ),
        deleteCategory: (id: number) =>
            handleApiCall(
                apiClientRest.delete(`/categories/${id}`),
                "deleteCategory"
            )
}