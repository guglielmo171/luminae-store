
import { productQueries } from "@/api/queries/productQueries";
import { productsService } from "@/api/services/productsApi";
import type { Category } from "@/api/types/Category.interface";
import type { CreateProductRequest, Product } from "@/api/types/Product.interface";
import { queryClient } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

// Questo componente si occuperà solo della UI del form
// Riceverà props per gestire lo stato e il submit dall'esterno (o userà react-hook-form internamente in futuro)
// Per ora costruiamo lo scheletro visivo con shadcn



const ProductForm = ({ loadedData,loadedCategories,closeSheet }: { loadedData?: Product,loadedCategories?:Category[],closeSheet:()=>void}) => {
    const [image,setImage]=useState<string|undefined>(loadedData?.images?.[0])
    // console.log('product',loadedData);
    
    const {mutate:updateMutate,isPending:isUpdatePending} =useMutation({
        mutationFn:productsService.updateProduct,
        mutationKey:["products","update",loadedData?.id],
        onSuccess(_, {product}) {
            queryClient.refetchQueries({queryKey:productQueries.base})
            toast.success(`Product ${product.title} updated successfully`)
            closeSheet()

        },
        onSettled:()=>{
                // queryClient.invalidateQueries({queryKey:productQueries.all(null)})
        }
    })
    const {mutate:createMutate,isPending:isCreatePending} =useMutation({
        mutationFn:productsService.createProduct,
        mutationKey:["products","create"],
           onSuccess(_, product) {
            queryClient.refetchQueries({queryKey:productQueries.base})
               toast.success(`Product ${product.title} created successfully`)
            closeSheet()
        },
        onSettled:async ()=>{
            await queryClient.invalidateQueries({queryKey:productQueries.all(null)})
        }
    })

    const isPending= isUpdatePending || isCreatePending 

    const formAction=(fd:FormData)=>{
        const image=fd.get("image") as string
        const images = (!!loadedData?.images) ? [...loadedData?.images,image] : [image]
        // const data = Object.fromEntries(fd.entries())
        const payload: CreateProductRequest ={
            title:fd.get("title") as string,
            price:parseFloat(fd.get("price") as string),
            categoryId:parseInt(fd.get("category") as string),
            description:fd.get("description") as string,
            images
        }
        console.log('payload',payload);
        if(!loadedData?.id) {
            createMutate(payload)
        }else{
            updateMutate({product:payload,id:loadedData.id.toString()})
        }
        
    }
    return(
        <form className="space-y-6" action={formAction}>
            <div className="space-y-2">
                <Label htmlFor="title">Product Name</Label>
                <Input id="title" placeholder="e.g. Wireless Headphones" name="title" defaultValue={loadedData?.title} autoFocus />
            </div>

            <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="0.00" min="0" step="0.01" name="price" defaultValue={loadedData?.price} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={loadedData?.category?.id?.toString()}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {loadedCategories?.map((category)=>(
                                <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

             <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input id="description" name="description" placeholder="Short description of the product" defaultValue={loadedData?.description || ""} />
            </div>

             <div className="space-y-2">
                 <Label htmlFor="image">Image URL</Label>
                 <Input id="image" name="image" placeholder="https://..." value={image} onChange={(e)=>setImage(e.target.value)} />
                <Button variant="outline" type="button" onClick={()=>setImage(loadedData?.images?.[0])}>Reset Image</Button>

                <img className="rounded-md text-center" width={200} height={200} src={image} alt={loadedData?.title} />

            </div>


            <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={closeSheet}>Cancel</Button>
                <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Product"}</Button>
            </div>
        </form>
    )
}

export default ProductForm;
