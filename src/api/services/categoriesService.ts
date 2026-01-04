import apiClient from "../axiosClient";
import type { Category } from "../types/Category.interface";
import { handleApiCall } from "../utils/apiUtils";

export const categoriesService = {
    getCategories: () => 
        handleApiCall(
            apiClient.get<Category[]>("/categories"),
            "getCategories"
        ),
}