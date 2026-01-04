import { categoriesService } from "@/api/services/categoriesService";
import { CategoryFiltersView, type CategoryFiltersViewProps } from "@/shared/UI/product/Category";
import { useSuspenseQuery } from "@tanstack/react-query";

const CategoryFilters = (props: Omit<CategoryFiltersViewProps, 'categories'>) => {
  
   const { data: categories } = useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getCategories(),  
  });
  return <CategoryFiltersView categories={categories} {...props} />;
};


export default CategoryFilters;