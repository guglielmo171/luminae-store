export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}


export type CategoryCreateReq= Omit<Category,"id"|"slug">