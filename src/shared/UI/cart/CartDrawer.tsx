import { mockCart } from "@/api/mock/cartMockData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowRight, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import CartItem from "./CartItem";
import { useCart } from "./cart.store";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  // Mock data - sostituire con state management Zustand
  // const [cart, setCart] = useState(mockCart);
  const cartItems=useCart(store=>store.items)
  const onQuantityChange=useCart(store=>store.onQuantityChange)
  const onQuantityRemove=useCart(store=>store.onQuantityRemove)

  const handleQuantityChange = (itemId: string, quantity: number) => {
    console.log("Quantity changed:", itemId, quantity);
    onQuantityChange(itemId, quantity)
  };

  const handleRemoveItem = (itemId: string) => {
    console.log("Remove item:", itemId);
    onQuantityRemove(itemId)
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;
  // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalItems = cartItems.length
  const isEmpty = cartItems.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            <SheetTitle className="text-xl">Il tuo carrello</SheetTitle>
          </div>
          <SheetDescription>
            {isEmpty
              ? "Il carrello è vuoto"
              : `${totalItems} ${totalItems === 1 ? "articolo" : "articoli"}`}
          </SheetDescription>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Package className="size-12 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Il tuo carrello è vuoto
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Aggiungi prodotti al carrello per procedere all'acquisto
            </p>
            <Button onClick={onClose} className="gap-2">
              Continua lo shopping
              <ArrowRight className="size-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-3">
                {cartItems.map((item:any) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-muted/20">
              <div className="px-6 py-4 space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotale</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Spedizione</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Spedizione gratuita per ordini superiori a $100
                  </p>
                )}

                <Separator />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Totale</span>
                  <span className="font-bold text-2xl text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <SheetFooter className="px-6 pb-6 pt-2">
                <Button size="lg" className="w-full gap-2 text-base" asChild>
                  <a href="/checkout">
                    Procedi al checkout
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
