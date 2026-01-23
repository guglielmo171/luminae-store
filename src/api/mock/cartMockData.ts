import type { Cart, CartItem } from "../types/Cart.interface";

export const mockCartItems: CartItem[] = [
  {
    id: "cart-item-1",
    product: {
      id: 1,
      title: "Elegant Wooden Chair",
      slug: "elegant-wooden-chair",
      price: 129.99,
      description: "Handcrafted wooden chair with premium finish",
      images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400"],
      creationAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      category: {
        id: 1,
        name: "Furniture",
        slug: "furniture"
      }
    },
    quantity: 2,
    addedAt: new Date("2024-01-20")
  },
  {
    id: "cart-item-2",
    product: {
      id: 2,
      title: "Modern Table Lamp",
      slug: "modern-table-lamp",
      price: 89.99,
      description: "Stylish LED table lamp with adjustable brightness",
      images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"],
      creationAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-10"),
      category: {
        id: 2,
        name: "Lighting",
        slug: "lighting"
      }
    },
    quantity: 1,
    addedAt: new Date("2024-01-21")
  },
  {
    id: "cart-item-3",
    product: {
      id: 3,
      title: "Ceramic Vase Set",
      slug: "ceramic-vase-set",
      price: 45.50,
      description: "Set of 3 handmade ceramic vases",
      images: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400"],
      creationAt: new Date("2024-01-12"),
      updatedAt: new Date("2024-01-12"),
      category: {
        id: 3,
        name: "Decor",
        slug: "decor"
      }
    },
    quantity: 1,
    addedAt: new Date("2024-01-22")
  }
];

export const mockCart: Cart = {
  items: mockCartItems,
  totalItems: mockCartItems.reduce((sum, item) => sum + item.quantity, 0),
  subtotal: mockCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
};
