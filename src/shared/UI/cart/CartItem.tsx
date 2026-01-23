import type { CartItem as CartItemType } from "@/api/types/Cart.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageIcon, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import imageFallbackPlaceholder from "../../../assets/image-not-found-placeholder.png";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(item.id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(item.id, newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
    onQuantityChange?.(item.id, newQuantity);
  };

  const totalPrice = (item.product.price * quantity).toFixed(2);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3">
        <div className="flex gap-3">
          {/* Product Image */}
          <Avatar className="size-20 rounded-md flex-shrink-0">
            <AvatarImage
              src={item.product.images[0]}
              alt={item.product.title}
              className="object-cover"
              onError={({ currentTarget }) => {
                currentTarget.src = imageFallbackPlaceholder;
              }}
            />
            <AvatarFallback className="rounded-md bg-muted">
              <ImageIcon className="size-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm line-clamp-2 leading-tight">
                  {item.product.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.product.category?.name}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-muted-foreground hover:text-destructive flex-shrink-0"
                onClick={() => onRemove?.(item.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            {/* Price and Quantity */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-3" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  className="h-7 w-12 text-center p-0 border-0 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min={1}
                  max={99}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={handleIncrease}
                >
                  <Plus className="size-3" />
                </Button>
              </div>

              <div className="text-right">
                <div className="font-bold text-sm">${totalPrice}</div>
                {quantity > 1 && (
                  <div className="text-xs text-muted-foreground">
                    ${item.product.price} each
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
