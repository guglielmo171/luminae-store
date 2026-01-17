import { createProductsQueryOptions, getSortParams } from "@/api/queries/productQueries";
import { Spinner } from "@/components/ui/spinner";
import { ProductList } from "@/shared/UI/product/ProductList";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type SortOption = "latest" | "price-asc" | "price-desc";

const ProductsListContent = ({ categoryId, sortBy ,searchTerm=""}: { categoryId: number | null; sortBy: SortOption,searchTerm?:string }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const { sortField, direction } = getSortParams(sortBy);

    const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(createProductsQueryOptions({search:searchTerm,categoryId,sortField,direction,}));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  // const allProducts = data.pages.map(d=>d.data).flat();
  const allProducts = data?.pages.flatMap((page) => page.data ) || [];
  console.log(allProducts,'data');

return <ProductList products={allProducts}>
    <div ref={ref} className="mt-12 flex justify-center py-4">
        {isFetchingNextPage && (
          <div className="flex items-center gap-4 py-8">
            <Spinner variant="primary" size="lg" />
          </div>
        )}
      </div>
</ProductList>
};

export default ProductsListContent;