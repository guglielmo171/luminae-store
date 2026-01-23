import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";

interface CartButtonProps {
  itemCount?: number;
}

const CartButton = ({ itemCount = 4 }: CartButtonProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false)


  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true)
      const timeout = setTimeout(() => {
        setIsAnimating(false)
      }, 600)
      return () => clearTimeout(timeout)
    }
  }, [itemCount])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={openCart}
        aria-label="Open shopping cart"
      >
        <ShoppingBag 
  className={`size-5 transition-transform ${
    isAnimating ? 'animate-[wiggle_0.5s_ease-in-out]' : ''
  }`} 
/>
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs font-bold"
          >
            {itemCount > 9 ? "9+" : itemCount}
          </Badge>
        )}
      </Button>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default CartButton;
