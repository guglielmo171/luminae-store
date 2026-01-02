import apiClient from "../axiosClient";
import type { Category } from "../types/Category.interface";

export const categoriesService = {
    getCategories:()=>apiClient.get<Category[]>("/categories"),
}