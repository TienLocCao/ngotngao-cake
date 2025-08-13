export interface CartItem {
  id: string;
  name: string;
  image: string | null;
  price: number | null;
  sizeId: string;
  quantity: number;
}

const STORAGE_KEY = 'cart';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCartItems(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToCartLocal(item: CartItem) {
  const items = getCartItems();
  const existing = items.find(
    (i) => i.id === item.id && i.sizeId === item.sizeId
  );
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push(item);
  }
  saveCartItems(items);
}

export function removeCartItem(id: string, sizeId: string) {
  const items = getCartItems().filter(
    (item) => !(item.id === id && item.sizeId === sizeId)
  );
  saveCartItems(items);
}

export function updateQuantity(id: string, sizeId: string, quantity: number) {
  const items = getCartItems().map((item) =>
    item.id === id && item.sizeId === sizeId
      ? { ...item, quantity }
      : item
  );
  saveCartItems(items);
}
