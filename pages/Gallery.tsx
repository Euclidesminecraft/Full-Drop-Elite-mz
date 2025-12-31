import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Project, CarCategory } from '../types';
import { Filter, ArrowRight, Search, X, Box, Plus, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useSearchParams } from 'react-router-dom';

const Gallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CarCategory | 'Todos'>('Todos');
  const [selectedTag, setSelectedTag] = useState<string | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  
  const { addToCart } = useCart();

  useEffect(() => {
    setProjects(storage.getProjects());
    
    // Check URL params for search
    const querySearch = searchParams.get('search');
    if (querySearch) {
        setSearchQuery(querySearch);
    }
  }, [searchParams]);

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'Todos' || project.category === selectedCategory;
    const tagMatch = selectedTag === 'Todos' || project.tags.includes(selectedTag);
    
    const searchMatch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && tagMatch && searchMatch;
  });

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedTag('Todos');
  };

  return (
    <div className="min-h-screen bg-fde-black pt-24">
      {/* Header Loja */}
      <div className="bg-fde-black border-b border-white/5 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fde-purple/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-end">
          <div>
            <span className="text-fde-purple font-bold text-sm tracking-[0.4em] uppercase mb-4 block">Catálogo Oficial</span>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tight mb-2 leading-[0.85]">
               Loja <span className="text-transparent bg-clip-text bg-gradient-to-r from-fde-purple to-white">Elite</span>
            </h1>
            <p className="text-gray-400 font-light text-lg border-l-2 border-fde-purple pl-6 mt-6 max-w-lg leading-relaxed">
               Peças Exclusivas, Kits Aerodinâmicos e Veículos Completos. A curadoria definitiva para entusiastas.
            </p>
          </div>
          
          <div className="mt-8 md:mt-0">
             <Link to="/3d-showroom" className="group flex items-center gap-6 bg-fde-darkgray border border-white/10 px-8 py-6 hover:border-fde-purple transition-all rounded-sm shadow-lg">
                <div className="bg-fde-purple p-3 rounded-full animate-pulse shadow-[0_0_15px_#9333ea]">
                    <Box className="text-white" size={24} />
                </div>
                <div className="text-left">
                    <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Não tem certeza?</span>
                    <span className="block text-2xl font-display font-bold text-white uppercase tracking-wide">Configure em 3D</span>
                </div>
                <ArrowRight className="text-white group-hover:translate-x-2 transition-transform" size={24} />
             </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block w-72 shrink-0 space-y-10">
                <div>
                    <h3 className="flex items-center gap-3 font-display font-bold text-2xl text-white uppercase mb-6 tracking-wide">
                        <SlidersHorizontal size={22} className="text-fde-purple" /> Categorias
                    </h3>
                    <div className="space-y-1">
                         <button
                            onClick={() => setSelectedCategory('Todos')}
                            className={`block w-full text-left text-sm uppercase tracking-wider py-3 px-4 rounded-sm transition-all border-l-2 ${selectedCategory === 'Todos' ? 'bg-white/5 text-white font-bold border-fde-purple' : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-white'}`}
                        >
                            Todas
                        </button>
                        {Object.values(CarCategory).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`block w-full text-left text-sm uppercase tracking-wider py-3 px-4 rounded-sm transition-all border-l-2 ${selectedCategory === cat ? 'bg-white/5 text-white font-bold border-fde-purple' : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                {/* Mobile Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                     <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        <input 
                            type="text" 
                            placeholder="Buscar projetos, tags..." 
                            className="w-full bg-fde-darkgray border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-fde-purple transition-colors font-sans"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white">
                                <X size={18} />
                            </button>
                        )}
                     </div>
                     
                     {/* Mobile Category Dropdown */}
                     <div className="lg:hidden">
                        <select 
                            className="w-full bg-fde-darkgray border border-white/10 text-white py-4 px-4 rounded-sm outline-none font-sans uppercase text-sm"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as CarCategory | 'Todos')}
                        >
                            <option value="Todos">Todas Categorias</option>
                            {Object.values(CarCategory).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                     </div>
                </div>

                {/* Tags Quick Filter */}
                <div className="flex flex-wrap gap-3 mb-10">
                    <button
                         onClick={() => setSelectedTag('Todos')}
                         className={`text-[10px] uppercase font-bold px-4 py-2 border transition-all tracking-widest ${selectedTag === 'Todos' ? 'bg-white text-black border-white shadow-[0_0_10px_white]' : 'text-gray-500 border-white/10 hover:border-white hover:text-white'}`}
                    >
                        Tudo
                    </button>
                    {allTags.slice(0, 8).map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? 'Todos' : tag)}
                            className={`text-[10px] uppercase font-bold px-4 py-2 border transition-all tracking-widest ${selectedTag === tag ? 'bg-white text-black border-white shadow-[0_0_10px_white]' : 'text-gray-500 border-white/10 hover:border-white hover:text-white'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <div key={project.id} className="group bg-fde-darkgray border border-white/5 hover:border-fde-purple/50 transition-all rounded-sm overflow-hidden flex flex-col hover:shadow-2xl">
                                {/* Altura aumentada e proporção ajustada */}
                                <div className="relative aspect-[3/2] overflow-hidden">
                                     <img 
                                        src={project.imageUrl} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                     />
                                     <div className="absolute top-4 right-4">
                                         <span className="bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-bold text-white border border-white/10 tracking-widest">
                                            {project.category}
                                         </span>
                                     </div>
                                     {/* ENCOMENDAR LABEL */}
                                     <div className="absolute bottom-5 left-5">
                                         <span className="bg-fde-purple px-4 py-2 text-lg font-display font-bold uppercase text-white shadow-lg tracking-widest skew-x-[-10deg] inline-block">
                                            ENCOMENDAR
                                         </span>
                                     </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1 border-t border-white/5">
                                    <h3 className="text-3xl font-display font-bold text-white uppercase leading-none mb-3 tracking-wide group-hover:text-fde-purple transition-colors">{project.title}</h3>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1 font-light leading-relaxed">{project.description}</p>
                                    
                                    <button 
                                        onClick={() => addToCart(project)}
                                        className="w-full mt-4 border border-white/20 text-white hover:bg-white hover:text-black hover:border-white py-4 font-display font-bold text-lg uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
                                    >
                                        <Plus size={18} /> Adicionar à Lista
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
                            <Filter className="mx-auto h-16 w-16 text-gray-700 mb-6" />
                            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide">Nenhum projeto encontrado</h3>
                            <p className="text-gray-500 mt-2 font-light">Tente ajustar seus filtros de busca.</p>
                            <button onClick={clearSearch} className="mt-6 text-fde-purple hover:text-white font-bold uppercase tracking-widest text-sm border-b border-fde-purple pb-1">Limpar filtros</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;