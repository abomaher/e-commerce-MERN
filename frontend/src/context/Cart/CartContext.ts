import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItems";

interface CartCntextType {
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
    updateItemInCart: (productId: string, quantity: number) => void;
    removeItemInCart: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartCntextType>({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {},
    updateItemInCart: () => {},
    removeItemInCart: () => {},
    clearCart: () => {}
});

export const useCart = () => useContext(CartContext);
