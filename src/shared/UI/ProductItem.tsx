import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { type Product } from "@/services/products";
import {
  ArrowRight,
    Heart,
    ShoppingBag,
    Star
} from "lucide-react";
import { Link } from "react-router";

const ProductItem = ({product}: {product: Product}) => {
  console.log('product',product.id, product);
  
  return (
       <Card key={product.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 flex flex-col">
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4 z-[5]">
                    <CardAction>
                      <Button variant="ghost" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        <Heart className="size-4 hover:fill-destructive hover:text-destructive" />
                      </Button>
                    </CardAction>
                  </div>
                  <div className="mb-4 aspect-square rounded-lg bg-linear-to-br from-muted/50 to-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden relative">
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-primary scale-[2] group-hover:scale-[2.5] transition-transform duration-500">
                      {product?.images?.[0] && <img src={product.images[0]} alt={product.title} width={200} height={200} />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="font-semibold">{product.category.name}</Badge>
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      {/* <span>{product.} ({product.reviews})</span> */}
                    </div>
                    
                  </div>
                  {/* <CardTitle className="text-xl group-hover:text-primary ">title</CardTitle> */}
                  <CardDescription className="line-clamp-2 mt-1 min-h-[40px]">{product.title}</CardDescription>
                  
                </CardHeader>
                
                <CardContent className="flex-grow">
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
                  <Button className="gap-2 shadow-sm transition-all active:scale-95 group/btn">
                    <ShoppingBag className="size-4 transition-transform group-hover/btn:-rotate-12" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
  )
}

export default ProductItem