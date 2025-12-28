import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  login: (identifier: string) => boolean;
  register: (data: { name: string; email: string; phone: string; location: string }) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('fde_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (identifier: string): boolean => {
    const foundUser = storage.login(identifier);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('fde_current_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (data: { name: string; email: string; phone: string; location: string }) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      role: 'CLIENT',
      createdAt: new Date().toISOString()
    };
    storage.saveUser(newUser);
    setUser(newUser);
    localStorage.setItem('fde_current_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fde_current_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout,
      isAdmin: user?.role === 'ADMIN' 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);