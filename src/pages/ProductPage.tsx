import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  RefreshCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck
} from "lucide-react";
import { Suspense, useState } from "react";
import { Link, useParams, type LoaderFunctionArgs } from "react-router";

import { createProductQueryOptions, createRelatedProductsQueryOptions } from "@/api/queries/productQueries";
import { queryClient } from "@/App";
import { SpinnerContent } from "@/components/ui/spinner";
import ProductItem from "@/shared/UI/ProductItem";

const ProductDetailsContent = ({ id }: { id: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product } = useSuspenseQuery(createProductQueryOptions({id}));

  const { data: relatedProducts } = useSuspenseQuery({
    ...createRelatedProductsQueryOptions({ id }),
    select: (products) => products.slice(0, 4),
  });


  

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-12 lg:px-24">
      {/* Navigation / Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/products" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="size-4" /> Back to Catalog
        </Link>
        <span className="opacity-40">/</span>
        <span className="font-medium text-foreground truncate">{product.title}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl bg-muted border border-border group relative">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button variant="secondary" size="icon" className="rounded-full shadow-lg backdrop-blur-sm bg-background/80">
                <Heart className="size-5 hover:fill-destructive hover:text-destructive" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full shadow-lg backdrop-blur-sm bg-background/80">
                <Share2 className="size-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index ? "border-primary shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={image} alt={`view ${index}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-semibold tracking-wide uppercase">
              {product.category.name}
            </Badge>
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                ))}
                <Star className="size-5 fill-muted text-muted" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">(128 reviews)</span>
            </div>
          </div>

          <div className="mb-8">
            <span className="text-4xl font-bold text-foreground">
              ${product.price}
            </span>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Truck className="size-6 text-primary" />
                  <span className="text-xs font-semibold">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center border-x border-border/50">
                  <ShieldCheck className="size-6 text-primary" />
                  <span className="text-xs font-semibold">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <RefreshCcw className="size-6 text-primary" />
                  <span className="text-xs font-semibold">30-Day Returns</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-auto flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1 gap-2 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
              <ShoppingBag className="size-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1 text-lg font-semibold transition-all hover:bg-muted/50">
              Buy Now
            </Button>
          </div>

          <div className="mt-10 space-y-4 border-t pt-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-primary/10 p-1">
                <ShieldCheck className="size-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Authenticity Guaranteed</h4>
                <p className="text-sm text-muted-foreground">We ensure the quality and authenticity of every product listed on our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">You May Also Like</h2>
              <p className="text-muted-foreground">Customers who viewed this item also bought these products.</p>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Product ID is missing</h2>
        <Link to="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
            <SpinnerContent />
          </div>
        }
      >
        <ProductDetailsContent id={id} />
      </Suspense>
    </div>
  );
};

export default ProductPage;

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) return null;

  return await queryClient.ensureQueryData(createProductQueryOptions({id}));
}

