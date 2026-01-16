import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { productsService } from "../services/productsApi";

  export const productQueries = {
  base: ["products"] as const,
  all: (search:string,categoryId?: number | null,sortField?:string,direction?:"forward"|"backward") => [...productQueries.base,{search}, { categoryId }, { sortField }, { direction }] as const,
  related: (id: number | string) => [...productQueries.base, "related", id] as const,
};

export function createProductsQueryOptions({ categoryId,search,sortField,direction }: { categoryId?: number | null,search:string,sortField?:string,direction?:"forward"|"backward" }) {
  return infiniteQueryOptions({
    queryKey: productQueries.all(search,categoryId,sortField,direction),
    queryFn: async ({ pageParam }:{pageParam?:number}) => {
      console.log('[Query] Fetching with cursor:', pageParam);
      console.log('searchparam',search);
      console.log('sortField',sortField,'direction',direction);
      
      const [response] = await Promise.all([
        // productsService.getProducts({ cursor: pageParam }),
        categoryId
          ? productsService.getProductsByCategory({ cursor: pageParam, catID: categoryId ,search,sortField,direction})
          : productsService.getProducts({ cursor: pageParam ,search,sortField,direction}),
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
  return queryClient.ensureQueryData(createProductsQueryOptions({search:"",categoryId:null}));
}

// Helper function to convert sort option to sortField and direction
export function getSortParams(sortBy: "latest" | "price-asc" | "price-desc"): { sortField: string; direction: "forward" | "backward" } {
  switch (sortBy) {
    case "latest":
      return { sortField: "creationAt", direction: "backward" };
    case "price-asc":
      return { sortField: "price", direction: "forward" };
    case "price-desc":
      return { sortField: "price", direction: "backward" };
    default:
      return { sortField: "creationAt", direction: "backward" };
  }
}