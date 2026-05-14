import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { MenuItem } from '../data/store';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  remarks: string;
  setRemarks: (r: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [remarks, setRemarks] = useState('');

  const addItem = useCallback((item: MenuItem) => {
    setItems(prev => {
      const idx = prev.findIndex(ci => ci.item.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(ci => ci.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(ci => ci.item.id !== itemId));
      return;
    }
    setItems(prev =>
      prev.map(ci => ci.item.id === itemId ? { ...ci, quantity: qty } : ci)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setRemarks('');
  }, []);

  const totalItems = items.reduce((s, ci) => s + ci.quantity, 0);
  const totalPrice = items.reduce((s, ci) => s + ci.item.price * ci.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, remarks, setRemarks }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
