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



const emailSchema = z.string().min(1, "L'email è richiesta").email("Email non valida");
const passwordSchema = z.string().min(1, "La password è richiesta").min(6, "La password deve essere di almeno 6 caratteri");

export const authSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal('login'),
    email: emailSchema,
    password: passwordSchema,
  }),
  z.object({
    mode: z.literal('signup'),
    email: emailSchema,
    password: passwordSchema,
  }),
  z.object({
    mode: z.literal('magic_link'),
    email: emailSchema,
    password: z.string().optional(),
  }),
  z.object({
    mode: z.literal('forgot_password'),
    email: emailSchema,
    password: z.string().optional(),
  }),
]);

export type AuthFormData = z.infer<typeof authSchema>;
