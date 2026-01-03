import { createProductsQueryOptions } from "@/api/queries/productQueries";
import { categoriesService } from "@/api/services/categoriesService";
import { queryClient } from "@/App";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductsListContent from "@/features/product/productList";
import CategoryFilters from "@/features/product/CategoriesFilter";
import {
  Briefcase,
  ChevronDown,
  Filter,
  Monitor,
  Watch
} from "lucide-react";
import { Suspense, useState } from "react";

const skeleton=(
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-muted animate-pulse rounded-2xl" />
                  <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
)

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
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-24">
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
          fallback={skeleton}
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