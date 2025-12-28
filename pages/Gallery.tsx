import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Project, CarCategory } from '../types';
import { Filter, ArrowRight, Search, X, Box } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Gallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CarCategory | 'Todos'>('Todos');
  const [selectedTag, setSelectedTag] = useState<string | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Forçar recarregamento do storage para pegar os novos dados se necessário
    setProjects(storage.getProjects());
  }, []);

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'Todos' || project.category === selectedCategory;
    const tagMatch = selectedTag === 'Todos' || project.tags.includes(selectedTag);
    
    // Filtro de pesquisa (Case insensitive)
    const searchMatch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && tagMatch && searchMatch;
  });

  const handleInterest = (projectTitle: string) => {
    if (!user) {
      navigate(`/auth?project=${encodeURIComponent(projectTitle)}`);
    } else {
      const message = `Olá! Sou ${user.name} (Cliente VIP). Tenho interesse no projeto: ${projectTitle}.`;
      window.location.href = `https://wa.me/258862560607?text=${encodeURIComponent(message)}`;
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-fde-black pt-24">
      {/* Header */}
      <div className="bg-fde-black border-b border-white/5 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fde-purple/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-fde-purple font-bold text-sm tracking-widest uppercase mb-4 block">Showroom</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter mb-6 leading-none">
            Galeria <span className="text-transparent bg-clip-text bg-gradient-to-r from-fde-purple to-white">Elite</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-lg font-light border-l-2 border-fde-purple pl-6">
             Projetos reais feitos para as ruas de Moçambique. Pesquise seu modelo favorito.
          </p>
        </div>
      </div>
      
      {/* 3D Banner CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
         <Link to="/3d-showroom" className="block group">
            <div className="bg-gradient-to-r from-fde-purple to-indigo-900 rounded-lg p-1">
                <div className="bg-black/90 p-6 rounded flex items-center justify-between hover:bg-black/80 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="bg-fde-purple p-3 rounded-full animate-bounce">
                            <Box className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold text-white uppercase">Experiência 3D Interativa</h3>
                            <p className="text-gray-400 text-sm">Configure cores e visualize detalhes em nosso estúdio virtual.</p>
                        </div>
                    </div>
                    <ArrowRight className="text-white group-hover:translate-x-2 transition-transform" />
                </div>
            </div>
         </Link>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-24 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            
            {/* Search Bar */}
            <div className="relative w-full md:max-w-xl">
              <input 
                type="text" 
                placeholder="Pesquisar por modelo (Ex: Mark X, Lexus, Ractis)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-fde-darkgray/50 border border-white/20 text-white pl-12 pr-10 py-3 focus:outline-none focus:border-fde-purple focus:bg-black transition-colors rounded-sm font-sans"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {searchQuery && (
                <button 
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                    <X size={18} />
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('Todos')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                    selectedCategory === 'Todos' ? 'text-black bg-white border-white' : 'text-gray-400 border-white/10 hover:border-white hover:text-white bg-transparent'
                  }`}
                >
                  Todos
                </button>
                {Object.values(CarCategory).filter(c => c !== 'Todos').map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                      selectedCategory === cat ? 'text-black bg-white border-white' : 'text-gray-400 border-white/10 hover:border-white hover:text-white bg-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Tag Filter */}
              <div className="flex items-center gap-4">
                <Filter className="text-fde-purple" size={18} />
                <select 
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="bg-transparent text-white border-b border-white/20 px-4 py-2 text-sm focus:outline-none focus:border-fde-purple font-sans uppercase tracking-wider min-w-[150px]"
                >
                  <option value="Todos" className="bg-black text-gray-400">Estilo</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag} className="bg-black text-white">{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredProjects.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
                <h3 className="text-2xl font-display text-gray-400 uppercase tracking-widest mb-2">Nenhum carro encontrado</h3>
                <p className="text-gray-500">Tente buscar por "Mark X", "Toyota", "Lexus" ou "Ractis".</p>
                <button onClick={clearSearch} className="mt-4 text-fde-purple hover:underline">Limpar pesquisa</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                <div key={project.id} className="bg-fde-darkgray border border-white/5 flex flex-col group hover:border-fde-purple/30 transition-colors">
                    <div className="relative h-64 overflow-hidden">
                    <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 bg-fde-purple text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                        {project.category}
                    </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white uppercase mb-2 group-hover:text-fde-purple transition-colors">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 3).map(t => (
                                <span key={t} className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400">{t}</span>
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={() => handleInterest(project.title)}
                        className="mt-4 w-full py-3 border border-white/10 hover:border-fde-purple hover:bg-fde-purple hover:text-white text-gray-300 uppercase text-xs font-bold tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        Solicitar Orçamento <ArrowRight size={14} />
                    </button>
                    </div>
                </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;