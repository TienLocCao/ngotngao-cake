// lib/cart.ts
export interface CartItem {
  id: string;
  title: string;
  image: string;
  price: string;
  description: string;
  badge?: string;
  sizeId: string;
  quantity: number;
}

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return []; // tránh lỗi SSR
  const raw = localStorage.getItem('cart');
  return raw ? JSON.parse(raw) : [];
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(items));
}

export function addToCartLocal(newItem: CartItem) {
  const items = getCartItems();
  const existing = items.find(
    (item) => item.id === newItem.id && item.sizeId === newItem.sizeId
  );

  if (existing) {
    existing.quantity += newItem.quantity;
  } else {
    items.push(newItem);
  }

  saveCartItems(items);
}
