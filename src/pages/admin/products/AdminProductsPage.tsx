
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { createProductQueryOptions, createProductsQueryOptions } from "@/api/queries/productQueries";
import { createCategoriesQueryOptions } from "@/api/queries/categoryQueries";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Pencil, Trash, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSearchParams } from "react-router";
import ProductForm from "@/shared/UI/admin/products/ProductForm";

import { Suspense, useState } from "react";
import CategoryFilters from "@/features/product/CategoriesFilter";
import { Input } from "@/components/ui/input";

const AdminProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const selectedProductId = searchParams.get("productId");
  const isSheetOpen = searchParams.has("productId") || searchParams.has("create");

  const {data:product}=useQuery({
    ...createProductQueryOptions({id:selectedProductId!}),
    enabled:!!selectedProductId,
  })


  const { data: categories } = useQuery({...createCategoriesQueryOptions(),
    enabled: isSheetOpen 
  });

  const openCreateSheet = () => {
    setSearchParams({ create: "true" });
  };

  const openEditSheet = (id: number) => {
    setSearchParams({ productId: id.toString() });
  };

  const closeSheet = () => {
    setSearchParams({});
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,isPending } =
    useInfiniteQuery(createProductsQueryOptions({ categoryId: selectedCategoryId }));

  const products = data?.pages.flatMap((page) => page) || [];
  
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let productListContent;


  if(isPending){
    productListContent=(<tr>
                   <td colSpan={5} className="py-8 text-center text-gray-500">
                      Loading products...
                   </td>
                </tr>)
  }
  if(data){
    productListContent=(<>
     {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="h-10 w-10 rounded-md bg-gray-100 border border-gray-200 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {product.title}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="font-normal">
                      {product.category?.name || 'Uncategorized'} 
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditSheet(product.id)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
    </>)
  }
  
  if(data && filteredProducts.length === 0){
     productListContent=(<tr>
                   <td colSpan={5} className="py-8 text-center text-gray-500">
                      {searchTerm ? "No products match your search. Try loading more data" : "No products found."}
                   </td>
                </tr>)
  }

  let productContent;

  if(selectedProductId && product && categories){
    productContent=<ProductForm closeSheet={closeSheet} loadedData={product ?? undefined} loadedCategories={categories ?? []} />
  } 

  // Create Mode: Wait for categories to load
  if(isSheetOpen && !selectedProductId && categories){
    productContent = <ProductForm closeSheet={closeSheet} loadedCategories={categories ?? []} />
  }

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

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 w-[80px]">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">{productListContent}</tbody>
          </table>
        </div>
        
        {/* Pagination / Load More Footer */}
        {data && (  <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-center">
            {(hasNextPage) ? (
                 <Button 
                    variant="outline" 
                    onClick={() => fetchNextPage()} 
                    disabled={isFetchingNextPage}
                 >
                    {isFetchingNextPage ? "Loading..." : "Load More Products"}
                 </Button>
            ) : (
                <p className="text-sm text-muted-foreground">No more products to load</p>
            )}
        </div>)}
      
      </div>


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
             {productContent}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProductsPage;
