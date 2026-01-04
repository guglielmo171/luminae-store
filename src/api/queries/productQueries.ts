import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { productsService } from "../services/productsApi";

  export const productQueries = {
  all: (categoryId?: number | null) => ["products", { categoryId }] as const,
  related: (id: number | string) => ["products", "related", id] as const,
};


export function createProductsQueryOptions({categoryId}: {categoryId?: number | null}){
    return infiniteQueryOptions({
    queryKey: productQueries.all(categoryId),
    queryFn: async ({ pageParam = 0 }) => {
      return categoryId 
        ? productsService.getProductsByCategory({ page: pageParam as number, id: categoryId }) 
        : productsService.getProducts({ page: pageParam as number });
    },
    staleTime: 5 * 60 * 1000,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => 
      lastPage.length === 10 ? (lastPageParam as number) + 1 : undefined,
  });
}


export function createProductQueryOptions({ id }: { id: number | string }) {
  return queryOptions({
    queryKey: ["product", id],
    queryFn: () => productsService.getProductById(id),
  });
}

export function createRelatedProductsQueryOptions({ id }: { id: number | string }) {
  return queryOptions({
    queryKey: productQueries.related(id),
    queryFn: () => productsService.getRelatedProducts(id),
  });
}

export async function ensureQueryData({ queryClient }: { queryClient: any }) {
  return queryClient.ensureQueryData(createProductsQueryOptions({categoryId:null}));
}