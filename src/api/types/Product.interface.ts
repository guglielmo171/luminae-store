import type { Category } from "./Category.interface";
import {z} from "zod"
// export interface Product {
//   id: number;
//   title: string;
//   slug: string;
//   price: number;
//   description: string;
//   category: ;
//   images: string[];
// }

export interface Product {
  category:Category;
  id: number;
  title: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  creationAt: string;
  updatedAt: string;
}



export type ProductUpdateDto= Pick<Product,"title"|"price"|"description"|"images"> & {categoryId:number} 


const emailSchema = z.string().min(1, "L'email è richiesta").email("Email non valida");
const passwordSchema = z.string().min(1, "La password è richiesta").min(6, "La password deve essere di almeno 6 caratteri");

export const authSchema = z.object({
  mode:z.enum(['login','signup','magic_link','forgot_password']),
  email:emailSchema,
  password:z.string()
}).superRefine((data,ctx)=>{
   if(['login','signup'].includes(data.mode)){
    const result = passwordSchema.safeParse(data.password);
    if(!result.success){
      result.error.issues.forEach(issue=>{
      ctx.addIssue({...issue,path:['password']})
      })
    }
   }
})

export type AuthFormData = z.infer<typeof authSchema>;
