
import { createCategoriesQueryOptions } from "@/api/queries/categoryQueries";
import { createProductQueryOptions } from "@/api/queries/productQueries";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProductForm from "@/shared/UI/admin/products/ProductForm";
import { useSuspenseQueries, type UseSuspenseQueryResult } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useSearchParams } from "react-router";

import type { Category } from "@/api/types/Category.interface";
import type { Product } from "@/api/types/Product.interface";
import { Input } from "@/components/ui/input";
import ProductList from "@/features/admin/product/productList";
import CategoryFilters from "@/features/product/CategoriesFilter";
import { Suspense, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const ProductFormContainer = ({productId,closeSheet}:{
  productId?: string | null;
  closeSheet: () => void;
})=>{
  const result: [
    UseSuspenseQueryResult<Category[],Error>,
    UseSuspenseQueryResult<Product,Error> | undefined,
  ]= useSuspenseQueries({
    queries:[
      createCategoriesQueryOptions(),
      ...(productId ? [createProductQueryOptions({id:productId})] : [])
    ]
  })

  const [categories,product]=result
  
  return <ProductForm 
  closeSheet={closeSheet} 
  loadedCategories={categories.data} 
  loadedData={product?.data} />
}



const AdminProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const selectedProductId = searchParams.get("productId");
  const isSheetOpen = searchParams.has("productId") || searchParams.has("create");

  const openCreateSheet = () => {
    setSearchParams({ create: "true" });
  };

  const openEditSheet = (id: number) => {
    setSearchParams({ productId: id.toString() });
  };

  const closeSheet = () => {
    setSearchParams({});
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
          <p className="text-gray-500 mt-2">
            Manage your product inventory and catalog efficiently.
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={openCreateSheet}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>



       <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between py-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Suspense fallback={<div className="h-10 w-64 bg-muted animate-pulse rounded-full" />}>
                <CategoryFilters 
                  selectedCategoryId={selectedCategoryId} 
                  onSelectCategory={setSelectedCategoryId} 
                />
              </Suspense>
      </div>

      <Suspense fallback={<>
                   <div className="py-8 text-center text-gray-500">
                      Loading products...
                   </div>
                </>}>
        <ProductList  selectedCategoryId={selectedCategoryId} onOpenEditSheet={openEditSheet} searchTerm={searchTerm} />
      </Suspense>

      <Sheet open={isSheetOpen} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedProductId ? "Edit Product" : "Create Product"}
            </SheetTitle>
            <SheetDescription>
              {selectedProductId
                ? `Make changes to product #${selectedProductId} here. Click save when you're done.`
                : "Add a new product to your inventory. Fill out all required fields."}
            </SheetDescription>
          </SheetHeader>

          {/* Form */}
          <div className="py-6">
            <Suspense fallback={<Spinner/>}>
              <ProductFormContainer 
              closeSheet={closeSheet} 
              productId={selectedProductId} />
            </Suspense>
          </div>
        </SheetContent>
      </Sheet>

    </div>
  );
};

export default AdminProductsPage;
