import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { BASE_URL } from "../../constants/BaseUrl";
import { CartItem } from "../../types/CartItems";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Fsiled to fetch user cart. Please try again.");
      }

      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
        /* eslint-disable @typescript-eslint/no-explicit-any */
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string, quantity?: number) => {
    try {
      const qty = quantity ? quantity : 1;
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: qty,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart!");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data!");
      }

      const cartItemsMapped = cart.items.map(
        /* eslint-disable @typescript-eslint/no-explicit-any */
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemInCart = async (productId: string, quantity: number) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        setError("Failed to update to cart!");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data!");
      }

      const cartItemsMapped = cart.items.map(
        /* eslint-disable @typescript-eslint/no-explicit-any */
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItemInCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to delete to cart!");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data!");
      }

      const cartItemsMapped = cart.items.map(
        /* eslint-disable @typescript-eslint/no-explicit-any */
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to empty to cart!");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data!");
      }

      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        removeItemInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;