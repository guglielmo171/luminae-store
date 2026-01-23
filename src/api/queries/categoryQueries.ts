import { queryOptions } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";

export const categoryQueries = {
  all: ["categories"] as const,
};

export function createCategoriesQueryOptions() {
  return queryOptions({
    queryKey: categoryQueries.all,
    queryFn: () => categoriesService.getCategories(),
  });
}

export function createCategoryQueryOptions(id: string) {
  return queryOptions({
    queryKey: [...categoryQueries.all, id],
    queryFn: () => categoriesService.getCategoryById(id),
  });
}
