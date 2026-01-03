import type { Category } from "@/api/types/Category.interface";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Filter } from "lucide-react";

export interface CategoryFiltersViewProps{
  categories: Category[],
  selectedCategoryId: number | null, 
  onSelectCategory: (id: number | null) => void 
}


export const CategoryFiltersView  = ({ 
    categories,
  selectedCategoryId, 
  onSelectCategory 
}:CategoryFiltersViewProps) => {
 

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

