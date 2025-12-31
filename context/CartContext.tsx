import React, { createContext, useState, useContext, useEffect } from 'react';
import { Project } from '../types';

interface CartContextType {
  cart: Project[];
  addToCart: (project: Project) => void;
  removeFromCart: (projectId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Project[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from local storage on init
  useEffect(() => {
    const storedCart = localStorage.getItem('fde_cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('fde_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (project: Project) => {
    // Check if item is already in cart to prevent duplicates (for this specific car shop logic)
    if (!cart.find(item => item.id === project.id)) {
      setCart([...cart, project]);
      setIsCartOpen(true); // Open drawer when adding
    } else {
        setIsCartOpen(true);
    }
  };

  const removeFromCart = (projectId: string) => {
    setCart(cart.filter(item => item.id !== projectId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);