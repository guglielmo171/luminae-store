import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

interface CartButtonProps {
  itemCount?: number;
}

const CartButton = ({ itemCount = 4 }: CartButtonProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={openCart}
        aria-label="Open shopping cart"
      >
        <ShoppingBag className="size-5" />
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
