import type { Product } from '@/api/types/Product.interface';
import { Search } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import ProductItem from './ProductItem';


interface Props{
    products:Product[]
}
export const ProductList = ({products,children}:PropsWithChildren<Props>) => {
   if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Search className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {children}
    
    </>
  );
}
