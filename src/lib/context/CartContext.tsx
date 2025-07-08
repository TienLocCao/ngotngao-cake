'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems, saveCartItems, CartItem } from '@/lib/cart';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, sizeId: string, quantity: number) => void;
  removeItem: (id: string, sizeId: string) => void;
  refresh: () => void;
  removeAllItem: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const addToCart = (item: CartItem) => {
    const updated = [...cartItems];
    const existing = updated.find(
      (i) => i.id === item.id && i.sizeId === item.sizeId
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      updated.push(item);
    }
    setCartItems(updated);
    saveCartItems(updated);
  };

  const updateQuantity = (id: string, sizeId: string, quantity: number) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.sizeId === sizeId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    setCartItems(updated);
    saveCartItems(updated);
  };

  const removeItem = (id: string, sizeId: string) => {
    const updated = cartItems.filter(
      (i) => !(i.id === id && i.sizeId === sizeId)
    );
    setCartItems(updated);
    saveCartItems(updated);
  };

  const removeAllItem = () => {
    setCartItems([])
    saveCartItems([]);
  }

  const refresh = () => {
    setCartItems(getCartItems());
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, refresh, removeAllItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
