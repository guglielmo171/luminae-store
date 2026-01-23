import { createProductsQueryOptions } from '@/api/queries/productQueries';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { productsService } from '@/api/services/productsApi';
import { queryClient } from '@/App';
import { productQueries } from '@/api/queries/productQueries';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
const ProductList = ({selectedCategoryId,searchTerm,onOpenEditSheet}:{selectedCategoryId?: number | null,searchTerm:string,onOpenEditSheet: (id: number) => void}) => {

     const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(createProductsQueryOptions({ categoryId: selectedCategoryId,search:searchTerm }));

  const [productToDelete, setProductToDelete] = useState<{id: number, title: string} | null>(null);
  
  const { mutate: deleteProduct } = useMutation({
    mutationFn: productsService.deleteProduct,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: productQueries.base });
      queryClient.refetchQueries({ queryKey: productQueries.base });
      toast.success("Product deleted successfully");
      setProductToDelete(null);
    },
  });

  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
    }
  };

  const products = data?.pages.flatMap((page) => page.data ) || [];
  
  // const products = products.filter(product => 
  //   product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

     let productListContent;


//   if(isPending){
//     productListContent=(<tr>
//                    <td colSpan={5} className="py-8 text-center text-gray-500">
//                       Loading products...
//                    </td>
//                 </tr>)
//   }
  if(products){
    productListContent=(<>
     {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="h-10 w-10 rounded-md bg-gray-100 border border-gray-200 overflow-hidden">
                      <img
                        src={product?.images?.[0]}
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
                    ${product?.price?.toFixed(2)}
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
                        <DropdownMenuItem onClick={() => onOpenEditSheet(product.id)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600 cursor-pointer"
                          onClick={() => setProductToDelete({id: product.id!, title: product.title!})}
                        >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
    </>)
  }
  
  if(data && products.length === 0){
     productListContent=(<tr>
                   <td colSpan={5} className="py-8 text-center text-gray-500">
                      {searchTerm ? "No products match your search. Try loading more data" : "No products found."}
                   </td>
                </tr>)
  }
    
  return (
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
      
        <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product
                        {productToDelete && <strong> "{productToDelete.title}"</strong>} and all associated data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
  )
}

export default ProductList