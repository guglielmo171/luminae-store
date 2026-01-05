import type { Category } from "./Category.interface";
import {z} from "zod"
export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export const authSchema = z.object({
  email:z.string().min(1,"Email Richiesta").email("Email non valida"),
  password: z.string().min(6, 'Min 6 caratteri')
});

export type AuthFormData = z.infer<typeof authSchema>;
