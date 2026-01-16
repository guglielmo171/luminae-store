import { queryClient } from "@/App";
import { categoryQueries } from "@/api/queries/categoryQueries";
import { categoriesService } from "@/api/services/categoriesService";
import type { Category, CreateCategoryRequest } from "@/api/types/Category.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CategoryFormProps {
  loadedData?: Category;
  closeSheet: () => void;
}

const CategoryForm = ({ loadedData, closeSheet }: CategoryFormProps) => {
  const { register, handleSubmit } = useForm<Partial<Category>>({
    defaultValues: loadedData || {},
  });

  const {mutate:createCategory} = useMutation({
    mutationFn:categoriesService.createCategory,
    mutationKey:["categoryCreate"],
     onSuccess:(data)=>{
        queryClient.refetchQueries({
            queryKey:categoryQueries.all
        })
        toast.success(`Category "${data.name}" created successfully`)
    }
  })

  const {mutate:updateCategory} = useMutation({
    mutationFn:categoriesService.updateCategory,
    mutationKey:["categoryCreate"],
    onSuccess:(data)=>{
        queryClient.refetchQueries({
            queryKey:categoryQueries.all
        })
        toast.success(`Category "${data.name}" updated successfully`)
    }
  })

  const onSubmit = (data: Partial<Category>) => {
    console.log("Submit Category:", data);
    if(loadedData){
        updateCategory({category:data,id:loadedData.id})
    }else{

        createCategory(data as CreateCategoryRequest)
    }
    closeSheet();
  };

  const [image,setImage] = useState(loadedData?.image)

  const handleImageChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {value}=e.target
    if(!value){
        resetImage() 
        return;}

    setImage(value)

  }

  const resetImage=()=>setImage(loadedData?.image)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input id="name" {...register("name", { required: true })} placeholder="e.g. Electronics" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" {...register("image")} placeholder="https://example.com/image.jpg" onChange={handleImageChange} />
         <img className="rounded-md text-center" width={200} height={200} src={image} alt={loadedData?.name} />
        <Button variant="outline" type="button" onClick={resetImage}>Reset Image</Button>

      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1">
          {loadedData ? "Update Category" : "Create Category"}
        </Button>
        <Button type="button" variant="outline" onClick={closeSheet}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
