import { createCategoriesQueryOptions } from '@/api/queries/categoryQueries'
import { DropdownMenuTrigger,DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { useSuspenseQuery } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import {Button} from "@/components/ui/button"
import { useMutation } from '@tanstack/react-query'
import { categoriesService } from '@/api/services/categoriesService'
import { queryClient } from '@/App'
import { categoryQueries } from '@/api/queries/categoryQueries'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from 'react'
interface Props {
  searchTerm: string;
  onEdit: (id: number) => void;
}
const CategoryList = ({ searchTerm, onEdit }: Props) => {

    const {data:categories}=useSuspenseQuery(createCategoriesQueryOptions())
    const [categoryToDelete, setCategoryToDelete] = useState<{id: number, name: string} | null>(null)
    
    const { mutate: deleteCategory } = useMutation({
        mutationFn: categoriesService.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryQueries.all });
            toast.success("Category deleted successfully");
            setCategoryToDelete(null);
        },
    });

    const handleDelete = () => {
        if (categoryToDelete) {
            deleteCategory(categoryToDelete.id);
        }
    };

    const filteredCategories=categories.data.filter((category)=>category.name.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <>
    {/* {filteredCategories.map((category)=>(
        <div key={category.id}>{category.name}</div>
    ))} */}

     <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 w-[80px]">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {filteredCategories.map((category)=>(<tr className="hover:bg-gray-50 transition-colors" key={category.id}>
                    <td className="py-3 px-4">
                        <div className="h-10 w-10 rounded-md bg-gray-100 border border-gray-200 overflow-hidden">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                        />
                        </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{category.name}</td>
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
                        <DropdownMenuItem onClick={() => onEdit(category.id)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600 cursor-pointer"
                            onClick={() => setCategoryToDelete({id: category.id, name: category.name})}
                        >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>))}
                 
            </tbody>
          </table>
        </div>
        </div>
    
        <AlertDialog open={!!categoryToDelete} onOpenChange={(open) => !open && setCategoryToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category
                        <strong> "{categoryToDelete?.name}"</strong> and all associated data.
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
    </>
  )
}

export default CategoryList