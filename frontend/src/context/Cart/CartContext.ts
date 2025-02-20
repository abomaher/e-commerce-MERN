import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItems";

interface CartCntextType {
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
}

export const CartContext = createContext<CartCntextType>({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {}
});

export const useCart = () => useContext(CartContext);
