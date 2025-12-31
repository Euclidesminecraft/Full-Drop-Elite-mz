import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gem, User as UserIcon, LogOut, Shield, Box, ShoppingBag } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { cart, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-fde-purple/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-fde-purple p-1 rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              <Gem className="h-6 w-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold tracking-[0.1em] text-white leading-none drop-shadow-md">
                FULL DROP
              </span>
              <span className="font-display text-sm font-semibold tracking-[0.8em] text-fde-purple leading-none text-right">
                STORE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-display text-xl font-medium tracking-wider transition-all duration-300 relative group uppercase ${
                    location.pathname === item.path
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-fde-purple transition-all duration-300 ${location.pathname === item.path ? 'w-full shadow-[0_0_10px_#9333ea]' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
              
              {/* 3D Link */}
              <Link to="/3d-showroom" className="text-white hover:text-white font-display font-bold text-lg uppercase tracking-wider flex items-center gap-2 border border-fde-purple/50 px-4 py-1 rounded-sm hover:bg-fde-purple hover:border-fde-purple transition-all hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]">
                 <Box size={16} /> 3D Studio
              </Link>

              {/* Admin Link if Admin */}
              {isAdmin && (
                <Link to="/admin" className="text-gray-400 hover:text-white font-display font-bold uppercase tracking-wide flex items-center gap-1">
                    <Shield size={16} /> ADM
                </Link>
              )}
            </div>
          </div>

          {/* Right Actions (Cart + Auth) */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Cart Button */}
            <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-300 hover:text-white transition-colors group"
            >
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-fde-purple text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                        {cart.length}
                    </span>
                )}
            </button>

            {/* User Auth */}
            {user ? (
                <div className="flex items-center gap-4 border-l border-white/20 pl-6">
                    <div className="text-right leading-tight">
                        <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Bem-vindo</span>
                        <span className="block text-white font-display font-bold tracking-wide text-lg">{user.name.split(' ')[0]}</span>
                    </div>
                    <button onClick={logout} className="text-gray-500 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            ) : (
                <Link to="/auth" className="flex items-center gap-2 text-white hover:text-fde-purple transition-colors font-display font-bold border border-white/10 px-5 py-2 hover:border-fde-purple rounded-sm">
                <UserIcon size={18} />
                <span className="uppercase text-lg tracking-wider">Login</span>
                </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden items-center gap-4">
            <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-300 hover:text-white"
            >
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-fde-purple text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cart.length}
                    </span>
                )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-4 rounded-md text-xl font-display uppercase tracking-wider ${
                  location.pathname === item.path
                    ? 'text-white bg-white/5 border-l-4 border-fde-purple'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                }`}
              >
                {item.label}
              </Link>
            ))}
             <Link to="/3d-showroom" className="block px-3 py-4 text-fde-purple font-display text-xl uppercase tracking-wider border-l-4 border-fde-purple hover:bg-white/5">
                <Box size={18} className="inline mr-2" /> 3D STUDIO
             </Link>
             
             {isAdmin && (
                <Link to="/admin" className="block px-3 py-4 text-gray-400 font-bold border-l-4 border-transparent hover:bg-white/5">
                    PAINEL ADM
                </Link>
             )}
             
             {user ? (
                 <button onClick={logout} className="w-full text-left block px-3 py-4 text-red-500 border-l-4 border-transparent hover:bg-white/5 font-display text-xl uppercase">
                     Sair
                 </button>
             ) : (
                <Link to="/auth" className="w-full text-left block px-3 py-4 text-lg font-medium text-fde-purple hover:text-white hover:bg-white/5 border-l-4 border-transparent">
                    <span className="flex items-center gap-2 font-display uppercase tracking-wider">
                        <UserIcon size={18} /> ENTRAR / CADASTRAR
                    </span>
                </Link>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;