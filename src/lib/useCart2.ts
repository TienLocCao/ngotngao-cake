'use client';

import { useEffect, useState } from 'react';
import {
  getCartItems,
  saveCartItems,
  CartItem,
} from '@/lib/cart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
    refresh();
  }, []);


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
      (item) => !(item.id === id && item.sizeId === sizeId)
    );
    setCartItems(updated);
    saveCartItems(updated);
  };

  const refresh = () => {
    setCartItems(getCartItems());
  };

  return {
    cartItems,
    updateQuantity,
    removeItem,
    refresh,
  };
}
