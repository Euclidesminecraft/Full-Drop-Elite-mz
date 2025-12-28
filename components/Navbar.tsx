import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gem, User as UserIcon, LogOut, Shield, Box } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

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
            <div className="bg-fde-purple p-1 rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <Gem className="h-6 w-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-[0.2em] text-white leading-none">
                FULL DROP
              </span>
              <span className="font-display text-sm font-bold tracking-[0.6em] text-fde-purple leading-none text-right">
                ELITE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-sans text-lg font-medium tracking-wide transition-all duration-300 relative group ${
                    location.pathname === item.path
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-fde-purple transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
              
              {/* 3D Link */}
              <Link to="/3d-showroom" className="text-fde-purple hover:text-white font-bold uppercase tracking-wide flex items-center gap-1 border border-fde-purple px-2 py-1 rounded hover:bg-fde-purple transition-colors">
                 <Box size={16} /> 3D Studio
              </Link>

              {/* Admin Link if Admin */}
              {isAdmin && (
                <Link to="/admin" className="text-gray-400 hover:text-white font-bold uppercase tracking-wide flex items-center gap-1">
                    <Shield size={16} /> ADM
                </Link>
              )}
            </div>
          </div>

          {/* User Auth Area (Desktop) */}
          <div className="hidden md:block">
            {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 uppercase tracking-widest text-right">
                        Olá, <br/><span className="text-white font-bold">{user.name.split(' ')[0]}</span>
                    </span>
                    <button onClick={logout} className="text-gray-500 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            ) : (
                <Link to="/auth" className="flex items-center gap-2 text-gray-300 hover:text-fde-purple transition-colors font-sans font-medium border border-white/10 px-4 py-2 hover:border-fde-purple rounded-sm">
                <UserIcon size={18} />
                <span className="uppercase text-sm tracking-wider">Login</span>
                </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
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
                className={`block px-3 py-4 rounded-md text-base font-medium border-l-4 ${
                  location.pathname === item.path
                    ? 'text-white bg-white/5 border-fde-purple'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                {item.label}
              </Link>
            ))}
             <Link to="/3d-showroom" className="block px-3 py-4 text-fde-purple font-bold border-l-4 border-fde-purple hover:bg-white/5">
                <Box size={18} className="inline mr-2" /> 3D STUDIO
             </Link>
             
             {isAdmin && (
                <Link to="/admin" className="block px-3 py-4 text-gray-400 font-bold border-l-4 border-transparent hover:bg-white/5">
                    PAINEL ADM
                </Link>
             )}
             
             {user ? (
                 <button onClick={logout} className="w-full text-left block px-3 py-4 text-red-500 border-l-4 border-transparent hover:bg-white/5">
                     Sair
                 </button>
             ) : (
                <Link to="/auth" className="w-full text-left block px-3 py-4 text-base font-medium text-fde-purple hover:text-white hover:bg-white/5 border-l-4 border-transparent">
                    <span className="flex items-center gap-2">
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