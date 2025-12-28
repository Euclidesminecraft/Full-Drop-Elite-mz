import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { storage } from '../utils/storage';
import { Project } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega projetos do "banco de dados" local
    const allProjects = storage.getProjects();
    setFeaturedProjects(allProjects.slice(0, 6)); // Mostrar os 6 primeiros na home
  }, []);

  const handleInterest = (projectTitle: string) => {
    if (!user) {
      // Se não logado, manda para cadastro com parametro de interesse
      navigate(`/auth?project=${encodeURIComponent(projectTitle)}`);
    } else {
      // Se logado, manda pro whats
      const message = `Olá! Sou ${user.name} (Cliente VIP). Tenho interesse no projeto: ${projectTitle}.`;
      window.location.href = `https://wa.me/258862560607?text=${encodeURIComponent(message)}`;
    }
  };

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog-section');
    catalogSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-fde-black">
      {/* HERO SECTION (Recepção) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Elite Custom Car" 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fde-black via-fde-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fde-purple/10 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-16 animate-fade-in-up">
          <div className="inline-block mb-6 border border-fde-purple/30 bg-fde-purple/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-fde-purple font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
              Bem-vindo à Elite Automotiva
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white uppercase leading-[0.85] mb-8 drop-shadow-2xl tracking-tighter">
            Full Drop<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Exclusivity.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
            Não modificamos apenas carros. Criamos lendas urbanas. Especialistas em projetos high-end.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <Button onClick={scrollToCatalog} className="text-xl px-12 animate-bounce">
              Ver Catálogo <ArrowDown className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CATALOG SECTION (Segunda Tela) */}
      <section id="catalog-section" className="py-24 bg-black relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-fde-purple font-bold text-sm tracking-widest uppercase mb-2 block">Catálogo Oficial</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase leading-none">
                Escolha Sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-fde-purple to-white">Máquina</span>
              </h2>
            </div>
            <Link to="/gallery" className="flex items-center text-gray-400 hover:text-white transition-colors font-display text-lg uppercase tracking-widest border-b border-fde-purple pb-1">
              Ver Todos os Filtros <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group relative h-[500px] overflow-hidden bg-fde-darkgray border border-white/5 hover:border-fde-purple/50 transition-all duration-300 flex flex-col">
                <div className="h-3/5 overflow-hidden relative">
                    <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 text-xs text-fde-purple font-bold uppercase tracking-wider rounded">
                        {project.category}
                    </div>
                </div>
                
                <div className="flex-grow p-6 flex flex-col justify-between bg-gradient-to-b from-fde-darkgray to-black">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white uppercase mb-2 leading-none">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(t => <span key={t} className="text-[10px] border border-white/10 px-2 py-1 text-gray-400">{t}</span>)}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleInterest(project.title)}
                    className="w-full bg-fde-purple hover:bg-white hover:text-black text-white py-3 font-display font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    Tenho Interesse <ArrowRight size={16} />
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
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-display font-bold text-white uppercase mb-8 leading-none tracking-tighter">
            Entre para a Elite
          </h2>
          <p className="text-gray-300 text-xl font-sans mb-12 max-w-xl mx-auto font-light">
            Cadastre-se para receber novidades exclusivas e acompanhar seus projetos.
          </p>
          {!user && (
            <Button to="/auth" variant="ghost" className="bg-white text-black hover:bg-black hover:text-white border-0 px-12 py-4">
                Criar Minha Conta
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;