import { createProductsQueryOptions } from "@/api/queries/productQueries";
import { categoriesService } from "@/api/services/categoriesService";
import { queryClient } from "@/App";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import ProductItem from "@/shared/UI/ProductItem";
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Check,
  ChevronDown,
  Filter,
  Monitor,
  Search,
  Watch
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const ProductsListContent = ({ categoryId }: { categoryId: number | null }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

    const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(createProductsQueryOptions({categoryId}));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = data.pages.flat();

  if (allProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Search className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {allProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      
      <div ref={ref} className="mt-12 flex justify-center py-4">
        {isFetchingNextPage && (
          <div className="flex items-center gap-4 py-8">
            <Spinner variant="primary" size="lg" />
          </div>
        )}
      </div>
    </>
  );
};

const CategoryFilters = ({ 
  selectedCategoryId, 
  onSelectCategory 
}: { 
  selectedCategoryId: number | null, 
  onSelectCategory: (id: number | null) => void 
}) => {
  const { data: categories } = useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: async ()=>{const {data} = await categoriesService.getCategories();return data},  
  });

  const selectedCategoryName = selectedCategoryId 
    ? categories.find(c => c.id === selectedCategoryId)?.name 
    : "All Categories";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-11 px-5 rounded-xl border-border bg-background/50 hover:bg-background transition-all flex items-center gap-3">
          <Filter className="size-4 text-primary" />
          <span className="font-semibold">{selectedCategoryName}</span>
          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 rounded-xl p-2 shadow-2xl border-border/50 backdrop-blur-xl bg-background/95">
        <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Filter by Category
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-border/50" />
        <DropdownMenuItem 
          onClick={() => onSelectCategory(null)}
          className="rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-colors focus:bg-primary/10 focus:text-primary mb-1 flex items-center justify-between"
        >
          All Products
          {selectedCategoryId === null && <Check className="size-4" />}
        </DropdownMenuItem>
        {categories.map((category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className="rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-colors focus:bg-primary/10 focus:text-primary mb-1 flex items-center justify-between"
          >
            {category.name}
            {selectedCategoryId === category.id && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProductsPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Section */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-20 px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Premium Collection</Badge>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Discover Excellence
              </h1>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Curated selection of high-end technology and lifestyle essentials designed for the modern professional.
              </p>
            </div>
            
            {/* <div className="flex items-center gap-3"> */}
              {/* <div className="relative group hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input 
                  type="text" 
                  placeholder="Quick search..."
                  className="h-11 w-[240px] lg:w-[320px] rounded-xl border border-input bg-background/50 pl-10 pr-4 text-sm outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4 focus:bg-background"
                />
              </div> */}
              {/* <Button variant="outline" size="icon" className="shrink-0 h-11 w-11 rounded-xl">
                <SlidersHorizontal className="size-5" />
              </Button> */}
            {/* </div> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-24">
        {/* Filters Top Bar */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Suspense fallback={<div className="h-10 w-64 bg-muted animate-pulse rounded-full" />}>
            <CategoryFilters 
              selectedCategoryId={selectedCategoryId} 
              onSelectCategory={setSelectedCategoryId} 
            />
          </Suspense>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground font-medium">Sort by:</span>
            <button className="group flex items-center gap-2 font-bold text-foreground hover:text-primary transition-all">
              Latest Arrivals 
              <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>

        <Suspense 
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-muted animate-pulse rounded-2xl" />
                  <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          }
        >
          <ProductsListContent categoryId={selectedCategoryId} />
        </Suspense>
      </main>

      {/* Summer Sale Banner */}
      <section className="mx-auto max-w-7xl px-6 mt-12 md:px-12 lg:px-24">
        <div className="rounded-[2.5rem] bg-foreground px-8 py-16 text-background flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative group shadow-2xl">
          <div className="absolute top-0 right-0 size-96 bg-primary/10 rounded-full -translate-y-48 translate-x-48 blur-[100px]" />
          <div className="absolute bottom-0 left-0 size-96 bg-blue-500/10 rounded-full translate-y-48 -translate-x-48 blur-[100px]" />
          
          <div className="relative z-[1] max-w-xl text-center md:text-left">
            <Badge className="mb-6 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm">Limited Season Offer</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Revolutionize Your <br className="hidden lg:block"/> Creative Workflow.</h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Experience the pinnacle of digital craftsmanship. Our new 2024 collection defines the boundary between art and utility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="secondary" size="lg" className="h-14 px-8 font-bold text-lg rounded-2xl shadow-xl hover:scale-105 transition-transform">
                Explore Collection
              </Button>
              <Button variant="ghost" size="lg" className="h-14 px-8 font-bold text-lg rounded-2xl text-white hover:bg-white/10">
                View Lookbook
              </Button>
            </div>
          </div>
          
          <div className="relative z-[1] flex items-center justify-center p-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-150 animate-pulse" />
              <div className="grid grid-cols-2 gap-4 relative">
                <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 -rotate-6 transform hover:rotate-0 transition-transform duration-500">
                  <Monitor className="size-16 opacity-80" />
                </div>
                <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 rotate-12 transform hover:rotate-0 transition-transform duration-500 mt-8">
                  <Watch className="size-12 opacity-80" />
                </div>
                <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 -rotate-12 transform hover:rotate-0 transition-transform duration-500">
                  <Briefcase className="size-14 opacity-80" />
                </div>
                <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 rotate-6 transform hover:rotate-0 transition-transform duration-500 mt-4">
                  <Filter className="size-10 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

export async function loader() {
  await queryClient.ensureQueryData({
    queryKey: ["categories"],
    queryFn: async ()=>{const {data} = await categoriesService.getCategories();return data},
  });
   queryClient.prefetchInfiniteQuery(createProductsQueryOptions({categoryId: null}));
  return null;
}