export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}


// export type CategoryCreateReq= Omit<Category,"id"|"slug">
export interface CreateCategoryRequest {
  name: string;
  slug?: string | undefined;
  image?: string | null | undefined;
}
export type UpdateCategoryRequest= Partial<CreateCategoryRequest>


