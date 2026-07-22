import React, { createContext, useContext, useMemo, useState } from 'react';
import type { CartItem } from '../types';

interface CartContextValue {
  cart: CartItem | null;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem | null {
  const raw = localStorage.getItem('cart');
  return raw ? (JSON.parse(raw) as CartItem) : null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem | null>(() => readCart());

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      addToCart: (item: CartItem) => {
        localStorage.setItem('cart', JSON.stringify(item));
        setCart(item);
      },
      clearCart: () => {
        localStorage.removeItem('cart');
        setCart(null);
      },
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
