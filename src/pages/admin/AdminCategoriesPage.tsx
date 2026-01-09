import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CategoryList from '@/features/admin/category/categoryList'
import { Plus, Search } from 'lucide-react'
import { Suspense, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSearchParams } from 'react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createCategoryQueryOptions } from '@/api/queries/categoryQueries';
import CategoryForm from '@/shared/UI/admin/categories/CategoryForm';
import { Spinner } from '@/components/ui/spinner';

const CategoryFormContainer = ({ categoryId, closeSheet }: { categoryId?: string | null; closeSheet: () => void }) => {
  const { data: category } = useSuspenseQuery(createCategoryQueryOptions(categoryId!));

  return <CategoryForm loadedData={categoryId ? category : undefined} closeSheet={closeSheet} />;
};

const AdminCategoriesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");

    const selectedCategoryId = searchParams.get("categoryId");
    const isSheetOpen = searchParams.has("categoryId") || searchParams.has("create");

    const openCreateSheet = () => {
      setSearchParams({ create: "true" });
    };

    const openEditSheet = (id: number) => {
      setSearchParams({ categoryId: id.toString() });
    };

    const closeSheet = () => {
      setSearchParams({});
    };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-2">
            Manage your categories
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={openCreateSheet}>
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>
      
       <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between py-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search categories..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>


      </div>
      
      <Suspense fallback={<>
                   <div className="py-8 text-center text-gray-500">
                      Loading categories...
                   </div>
                </>}>
        <CategoryList onEdit={openEditSheet} searchTerm={searchTerm} />
      </Suspense>


      <Sheet open={isSheetOpen} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedCategoryId ? "Edit Category" : "Create Category"}
            </SheetTitle>
            <SheetDescription>
              {selectedCategoryId
                ? `Make changes to category #${selectedCategoryId} here. Click save when you're done.`
                : "Add a new category. Fill out all required fields."}
            </SheetDescription>
          </SheetHeader>

          {/* Form */}
          <div className="py-6">
            {isSheetOpen && (
              <Suspense fallback={<Spinner />}>
                {selectedCategoryId ? (
                  <CategoryFormContainer 
                    closeSheet={closeSheet} 
                    categoryId={selectedCategoryId} 
                  />
                ) : (
                  <CategoryForm closeSheet={closeSheet} />
                )}
              </Suspense>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default AdminCategoriesPage