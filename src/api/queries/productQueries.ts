import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { productsService } from "../services/productsApi";

export const productQueryKey = (categoryId?: number | null)=>  ['products', {categoryId}] as const


export function createProductsQueryOptions({categoryId}: {categoryId?: number | null}){
    return infiniteQueryOptions({
    queryKey: productQueryKey(categoryId),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await (categoryId 
        ? productsService.getProductsByCategory({ page: pageParam as number, id: categoryId }) 
        : productsService.getProducts({ page: pageParam as number }));
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => 
      lastPage.length === 10 ? (lastPageParam as number) + 1 : undefined,
  });
}

export async function ensureQueryData({ queryClient }: { queryClient: any }) {
  return queryClient.ensureQueryData(createProductsQueryOptions({categoryId:null}));
}