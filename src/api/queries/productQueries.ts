import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { productsService } from "../services/productsApi";

  export const productQueries = {
  base: ["products"] as const,
  all: (categoryId?: number | null) => [...productQueries.base, { categoryId }] as const,
  related: (id: number | string) => [...productQueries.base, "related", id] as const,
};

export function createProductsQueryOptions({ categoryId }: { categoryId?: number | null }) {
  return infiniteQueryOptions({
    queryKey: productQueries.all(categoryId),
    queryFn: async ({ pageParam }:{pageParam?:number}) => {
      console.log('[Query] Fetching with cursor:', pageParam);
      const [response] = await Promise.all([
        // productsService.getProducts({ cursor: pageParam }),
        categoryId
          ? productsService.getProductsByCategory({ cursor: pageParam, catID: categoryId })
          : productsService.getProducts({ cursor: pageParam }),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
      console.log('[Query] Response:', {
        productsCount: response.data.length,
        nextCursor: response.nextCursor,
        hasNextPage: response.hasNextPage
      });
      return response;
    },
    staleTime: 5 * 60 * 1000,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      // Se c'è un nextCursor nella risposta, convertilo in numero per la prossima chiamata
      const nextCursor = lastPage.hasNextPage ? Number(lastPage.nextCursor) : undefined;
      console.log('[Query] getNextPageParam:', {
        nextCursor,
        hasNextPage: lastPage.hasNextPage,
        rawNextCursor: lastPage.nextCursor
      });
      return nextCursor;
    },
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