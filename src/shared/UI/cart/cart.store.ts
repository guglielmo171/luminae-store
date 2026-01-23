import { mockCartItems } from '@/api/mock/cartMockData'
import type { Cart, CartItem } from '@/api/types/Cart.interface'
import { create } from 'zustand'

export const useCart= create<{
    items:CartItem[],
    onQuantityChange:(itemId: string, quantity: number)=>void
    onQuantityRemove:(itemId: string)=>void
    onAdd:(item:CartItem)=>void
}>((set,get)=>({
    items:[],
    onAdd:(item:CartItem)=>set(()=>{
        const alreadyExist=get().items.find(i=>i.id == item.id);
        // const newItem=alreadyExist ? {...alreadyExist,quantity:alreadyExist.quantity + 1}: item;

        const updatedItems=alreadyExist ? get().items.map(i=>{
            return i.id == item.id ? {...i,quantity:i.quantity + 1} : i
        }) : [...get().items,item]
        return {items: updatedItems}
        // items:[...get().items,newItem]
    }),
    onQuantityChange:(itemId: string, quantity: number)=>set(()=>({
        items:get().items.map((item:any) =>
            item.id === itemId ? { ...item, quantity } : item
          )
    })),
    onQuantityRemove:(itemId:string)=>set(()=>({
        items:get().items.filter(i=>i.id !== itemId)
    }))
}))
