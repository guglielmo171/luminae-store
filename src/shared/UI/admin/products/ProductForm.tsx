
import { productQueries } from "@/api/queries/productQueries";
import { productsService } from "@/api/services/productsApi";
import type { Category } from "@/api/types/Category.interface";
import type { CreateProductRequest, Product } from "@/api/types/Product.interface";
import { queryClient } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
import { X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";


const MAX_IMAGES = 5;


const ProductForm = ({ loadedData,loadedCategories,closeSheet }: { loadedData?: Partial<Product>,loadedCategories?:Category[],closeSheet:()=>void}) => {


    const [currentImageIndex,setCurrentImageIndex]=useState<number>(0)
    const [images,setImages]=useState<string[]>(loadedData?.images ?? [])
    const currImage = images?.[currentImageIndex] ?? "";

    function resetImage(){
        const originalValue = loadedData?.images?.[currentImageIndex] ?? "";

        setImages((prev)=>{
            return prev.map((img,idx)=>(idx===currentImageIndex ? originalValue : img))
        })
    }

    function removeImage(index:number){
        setImages((prev)=>{
            const updatedImages=prev.filter((_,idx)=>idx !== index);
            // console.log('indexToDelete',indexToDelete);
            setCurrentImageIndex(0);
            return updatedImages;
        });
    }
    function updateImage(e:ChangeEvent<HTMLInputElement>){
        const newValue=e.currentTarget.value;
        // console.log('term change',e.currentTarget.value);
        setImages(prev => {
            const updatedImages=prev.map((img, idx) => 
                idx === currentImageIndex ? newValue : img
            )
            // console.log('updatedImages',updatedImages);
            return updatedImages
        })
    }

    function addImage(){
        // Calcoliamo la prossima posizione cioe (array.length -1 ) + 1. Possiamo usare direttamente length
        const nextPosition = images.length
        setImages(prev => {
            return [...prev,"https://i.imgur.com/NWIJKUj.jpeg"]
        })
        setCurrentImageIndex(nextPosition)
    }
    
    const {mutate:updateMutate,isPending:isUpdatePending} =useMutation({
        mutationFn:productsService.updateProduct,
        mutationKey:["products","update",loadedData?.id],
        onSuccess(_, {product}) {
            queryClient.refetchQueries({queryKey:productQueries.base})
            queryClient.refetchQueries({queryKey:["product", loadedData?.id?.toString()]})
            toast.success(`Product ${product.title} updated successfully`)
            closeSheet()

        },
        onSettled:()=>{
                queryClient.invalidateQueries({queryKey:productQueries.all()})
                queryClient.invalidateQueries({queryKey:["product", loadedData?.id?.toString()]})
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
            await queryClient.invalidateQueries({queryKey:productQueries.all()})
        }
    })

    const isPending= isUpdatePending || isCreatePending 

    const formAction=(fd:FormData)=>{
        // const image=fd.get("image") as string
        // const images = (!!loadedData?.images) ? [...loadedData?.images,image] : [image]
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
                 <Input id="image" name="image" placeholder="https://..." value={currImage} 
                 onChange={updateImage}
                //  onChange={(e)=>setImage(e.target.value)} 
                 />
                <Button
                    variant="outline"
                    type="button"
                    onClick={addImage}
                    disabled={images.length >= MAX_IMAGES}
                >
                    Add Image {images.length}/{MAX_IMAGES}
                </Button>
                {currentImageIndex}
                <Button variant="outline" type="button" onClick={resetImage}>Reset Image</Button>
            </div>
            <div className="space-y-3">
                {/* Immagine principale */}
                <div className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-lg border bg-muted">
                    <img 
                        src={currImage || "/placeholder.png"} 
                        alt="Product" 
                        className="h-full w-full object-cover"
                        
                    />
                </div>
                
                {/* Thumbnails cliccabili */}
                <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                    {images.map((img, index) => (
                        <div className="relative" key={index}>
                        <button
                           
                            type="button"
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                                currentImageIndex === index 
                                    ? "border-primary ring-2 ring-primary/20" 
                                    : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                        >
                            <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                        <Popover>
        <PopoverTrigger asChild>
        <button 
                    type="button"
                    className="absolute -bottom-2 -left-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center"
                >
                    <X className="w-3 h-3 text-white" />
                </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
            <p className="text-sm mb-2">Rimuovere?</p>
            <PopoverClose asChild>
                <Button  size="sm" variant="destructive" onClick={() => removeImage(index)}>
                    Conferma
                </Button>
            </PopoverClose> 
        </PopoverContent>
    </Popover>
                        </div>
                    ))}
                </div>
            </div>
                


            <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={closeSheet}>Cancel</Button>
                <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Product"}</Button>
            </div>
        </form>
    )
}

export default ProductForm;
