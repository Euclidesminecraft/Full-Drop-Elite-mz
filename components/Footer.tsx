import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Gem, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-fde-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group w-fit">
              <Gem className="h-8 w-8 text-fde-purple" />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-[0.2em] text-white leading-none">FULL DROP</span>
                <span className="font-display text-sm font-bold tracking-[0.6em] text-fde-purple leading-none text-right">ELITE</span>
              </div>
            </Link>
            <p className="text-gray-500 font-sans leading-relaxed text-sm">
              Redefinindo os padrões de exclusividade automotiva. Onde a engenharia alemã encontra a personalização de alto nível.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display text-lg uppercase mb-6 tracking-widest border-l-2 border-fde-purple pl-3">Menu</h3>
            <ul className="space-y-3">
              <li><Link to="/gallery" className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-wide">Galeria</Link></li>
              <li><Link to="/process" className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-wide">Processo</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-wide">A Marca</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-wide">Orçamento VIP</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-display text-lg uppercase mb-6 tracking-widest border-l-2 border-fde-purple pl-3">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-gray-500 group">
                <MapPin className="text-fde-purple shrink-0 group-hover:text-white transition-colors" size={18} />
                <a href="https://share.google/SYPhsAgcUU6S4loBe" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  Maputo, Moçambique
                </a>
              </li>
              <li className="flex items-center gap-4 text-gray-500 group">
                <Phone className="text-fde-purple shrink-0 group-hover:text-white transition-colors" size={18} />
                <a href="tel:+258864410088" className="text-sm hover:text-white transition-colors">+258 86 441 0088 (Chamadas)</a>
              </li>
              <li className="flex items-center gap-4 text-gray-500 group">
                <MessageCircle className="text-fde-purple shrink-0 group-hover:text-white transition-colors" size={18} />
                <a href="https://wa.me/258824410088" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">+258 82 441 0088 (WhatsApp)</a>
              </li>
              <li className="flex items-center gap-4 text-gray-500 group">
                <Mail className="text-fde-purple shrink-0 group-hover:text-white transition-colors" size={18} />
                <span className="text-sm">concierge@fulldrop.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-display text-lg uppercase mb-6 tracking-widest border-l-2 border-fde-purple pl-3">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-fde-darkgray p-3 rounded-full text-white hover:bg-fde-purple transition-all duration-300 hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-fde-darkgray p-3 rounded-full text-white hover:bg-fde-purple transition-all duration-300 hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-fde-darkgray p-3 rounded-full text-white hover:bg-fde-purple transition-all duration-300 hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-fde-darkgray p-3 rounded-full text-white hover:bg-fde-purple transition-all duration-300 hover:scale-110">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-sans text-xs uppercase tracking-wider">
            © {new Date().getFullYear()} Full Drop Elite. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-600 text-xs uppercase tracking-wider">
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;