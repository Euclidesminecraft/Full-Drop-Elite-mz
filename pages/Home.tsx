import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowDown, Search, Plus, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { storage } from '../utils/storage';
import { Project } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [allDataForSearch, setAllDataForSearch] = useState<Project[]>([]);

  useEffect(() => {
    const allProjects = storage.getProjects();
    setFeaturedProjects(allProjects.slice(0, 6)); 
    setAllDataForSearch(allProjects);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    
    if (val.length > 0) {
        const brands = ['Toyota', 'BMW', 'VW', 'Subaru', 'Honda', 'Nissan'];
        const matches = allDataForSearch
            .filter(p => p.title.toLowerCase().includes(val.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(val.toLowerCase())))
            .map(p => p.title)
            .slice(0, 5); // Limit suggestions

        // Add brand suggestions if matches
        const brandMatches = brands.filter(b => b.toLowerCase().includes(val.toLowerCase()));
        
        setSearchSuggestions([...brandMatches, ...matches]);
    } else {
        setSearchSuggestions([]);
    }
  };

  const executeSearch = (term: string) => {
    navigate(`/gallery?search=${encodeURIComponent(term)}`);
  };

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog-section');
    catalogSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-fde-black">
      {/* HERO SECTION (Recepção) */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Elite Custom Car BMW JDM" 
            className="w-full h-full object-cover opacity-50 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fde-black via-fde-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fde-purple/10 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-8 animate-fade-in-up w-full">
          <div className="inline-block mb-6 border border-fde-purple/30 bg-fde-purple/10 backdrop-blur-sm px-6 py-2 rounded-full">
            <span className="text-fde-purple font-display font-semibold text-lg tracking-[0.3em] uppercase">
              Loja Elite Automotiva
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-display font-bold text-white uppercase leading-[0.8] mb-6 drop-shadow-2xl tracking-tight">
            Full Drop<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 italic pr-2">Concept.</span>
          </h1>
          
          {/* SEARCH BAR WIDGET */}
          <div className="max-w-2xl mx-auto mb-10 relative group">
            <div className="relative flex items-center">
                <div className="absolute left-6 text-gray-400 group-focus-within:text-fde-purple transition-colors">
                    <Search size={24} />
                </div>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => e.key === 'Enter' && executeSearch(searchTerm)}
                    placeholder="Buscar: Mark X, Ractis, BMW..." 
                    className="w-full bg-black/80 backdrop-blur-xl border-2 border-white/20 text-white font-sans text-xl py-5 pl-16 pr-16 rounded-full focus:outline-none focus:border-fde-purple focus:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all placeholder-gray-500"
                />
                {searchTerm && (
                    <button 
                        onClick={() => {setSearchTerm(''); setSearchSuggestions([])}}
                        className="absolute right-6 text-gray-500 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-4 right-4 mt-2 bg-black/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl z-50 text-left">
                    {searchSuggestions.map((suggestion, idx) => (
                        <button
                            key={idx}
                            onClick={() => executeSearch(suggestion)}
                            className="w-full text-left px-6 py-4 text-gray-300 hover:bg-fde-purple hover:text-white transition-colors border-b border-white/5 last:border-0 flex items-center justify-between group/item"
                        >
                            <span className="font-sans text-lg">{suggestion}</span>
                            <ArrowRight size={16} className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                        </button>
                    ))}
                </div>
            )}
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <Button onClick={scrollToCatalog} className="text-xl px-12 py-3 shadow-[0_0_20px_rgba(147,51,234,0.6)]">
              Ver Catálogo <ArrowDown className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CATALOG SECTION (Segunda Tela) */}
      <section id="catalog-section" className="py-24 bg-black relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="text-fde-purple font-bold text-sm tracking-[0.3em] uppercase mb-2 block pl-1">Destaques do Mês</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-none tracking-tight">
                Escolha Sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-fde-purple to-white">Base</span>
              </h2>
            </div>
            <Link to="/gallery" className="flex items-center text-gray-400 hover:text-white transition-colors font-display text-xl uppercase tracking-widest pb-1 group">
              Ver Catálogo Completo <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group relative bg-fde-darkgray border border-white/5 hover:border-fde-purple/50 transition-all duration-300 flex flex-col rounded-sm overflow-hidden hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Image Area - Aspect Ratio 3:2 (9:6) */}
                <div className="relative aspect-[3/2] overflow-hidden">
                    <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <span className="bg-black/90 backdrop-blur-md px-4 py-1 text-xs text-white font-bold uppercase tracking-[0.15em] rounded border border-white/10">
                            {project.category}
                        </span>
                    </div>
                    {/* ENCOMENDAR TAG */}
                    <div className="absolute bottom-0 left-0 bg-fde-purple px-8 py-3 text-white font-display font-bold text-xl skew-x-12 -ml-4 shadow-xl">
                        <span className="-skew-x-12 block tracking-widest">ENCOMENDAR</span>
                    </div>
                </div>
                
                {/* Content Area */}
                <div className="flex-grow p-8 flex flex-col justify-between bg-gradient-to-b from-fde-darkgray to-black border-t border-white/5">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white uppercase mb-3 leading-none tracking-wide">{project.title}</h3>
                    <p className="text-gray-400 text-sm font-sans font-light leading-relaxed mb-6 border-l-2 border-white/10 pl-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map(t => <span key={t} className="text-[10px] font-bold uppercase tracking-wider border border-white/20 px-3 py-1 text-gray-400 rounded-sm">{t}</span>)}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(project)}
                    className="w-full bg-white text-black hover:bg-fde-purple hover:text-white py-4 font-display font-bold text-xl uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                  >
                    <Plus size={20} /> Adicionar à Lista
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-fde-purple relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-display font-bold text-white uppercase mb-6 leading-none tracking-tight">
            Clube Elite
          </h2>
          <p className="text-gray-200 text-xl md:text-2xl font-sans mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Cadastre-se para receber novidades sobre peças raras e slots de personalização disponíveis.
          </p>
            <Button to="/auth" variant="ghost" className="bg-white text-black hover:bg-black hover:text-white border-0 px-16 py-5 text-xl shadow-2xl">
                Criar Conta Grátis
            </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;