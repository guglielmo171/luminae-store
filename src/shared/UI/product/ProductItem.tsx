import type { Product } from "@/api/types/Product.interface";
import imageFallbackPlaceholder from "../../../assets/image-not-found-placeholder.png"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import {
  ArrowRight,
    Heart,
    ImageIcon,
    ShoppingBag,
    Star
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "../cart/cart.store";
import type { CartItem } from "@/api/types/Cart.interface";

const ProductItem = ({product}: {product: Product}) => {
  const [isImageLoading,setIsImageLoading]=useState(false);
  const addToCart=useCart(state=>state.onAdd)

  const onAddToCart=(item:Product)=>{
    const cartItem :CartItem={
      addedAt:new Date(),
      id:item.id.toString(),
      product:product,
      quantity:1
    }
    addToCart(cartItem);
  }
  return (
       <Card key={product.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 flex flex-col">
                <CardHeader className="relative flex flex-col">
                  <div className="absolute top-2 right-2 z-10">
                    <Button variant="ghost" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      <Heart className="size-4 hover:fill-destructive hover:text-destructive" />
                    </Button>
                  </div>
                  <div className="aspect-square w-full mb-4 flex items-center justify-center relative">
                    {isImageLoading && (
                      <Skeleton className="absolute inset-0 rounded-lg flex items-center justify-center">
                        <ImageIcon className="size-12 text-muted-foreground/50" />
                      </Skeleton>
                    )}
                    {product?.images?.[0] && <img
                      src={product.images[0]}
                      alt={product.title}
                      className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                      onError={({currentTarget}) => {
                        currentTarget.src = imageFallbackPlaceholder
                        setIsImageLoading(false)
                      }}
                      onLoadStart={() => setIsImageLoading(true)}
                      onLoad={() => setIsImageLoading(false)}
                    />}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="font-semibold">{product.category?.name}</Badge>
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1 min-h-[40px]">{product.title}</CardDescription>
                </CardHeader>
                
                <CardContent className="grow">
                  {/* Space for additional info if needed */}
                   <Link to={`/products/${product.id}`}>
                   <Button className="gap-2 shadow-sm transition-all active:scale-95 group/btn">
  <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
  Scopri di più
</Button>
</Link>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between border-t bg-muted/20 pt-4">
                  <div className="text-2xl font-bold text-foreground">
                    ${product.price}
                  </div>
                  <Button onClick={()=>onAddToCart(product)} className="gap-2 shadow-sm transition-all active:scale-95 group/btn">
                    <ShoppingBag className="size-4 transition-transform group-hover/btn:-rotate-12" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
  )
}

export default ProductItem