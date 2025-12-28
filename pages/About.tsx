import React from 'react';
import { Users, Target, Wrench, Gem } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-fde-black pt-20">
      
      {/* Hero */}
      <div className="relative py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-fde-purple font-bold text-sm tracking-widest uppercase mb-4">A Marca</h2>
           <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase leading-none mb-10 max-w-4xl">
              Nós criamos o que<br/>os outros <span className="text-gray-500">apenas sonham.</span>
           </h1>
           <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl border-l-4 border-fde-purple pl-8">
              A <strong>Full Drop Elite</strong> nasceu da insatisfação com o "padrão". Somos um atelier automotivo focado exclusivamente no mercado de luxo e superesportivos.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative">
             <div className="absolute inset-0 border-2 border-fde-purple transform -translate-x-4 -translate-y-4"></div>
             <img 
               src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
               alt="Garage" 
               className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
             />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-white uppercase mb-6 tracking-wide">Filosofia Dark & Clean</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Acreditamos que um carro modificado não deve parecer um brinquedo. Nossa estética é baseada no conceito "Clean Aggressive": linhas limpas, postura perfeita e presença intimidadora.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Utilizamos apenas componentes originais ou das marcas aftermarket mais respeitadas do mundo. Não há espaço para adaptações baratas em nosso vocabulário.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
               <div>
                  <span className="block text-4xl font-display font-bold text-white mb-2">150+</span>
                  <span className="text-gray-500 text-sm uppercase tracking-wider">Projetos Entregues</span>
               </div>
               <div>
                  <span className="block text-4xl font-display font-bold text-white mb-2">50Mi+</span>
                  <span className="text-gray-500 text-sm uppercase tracking-wider">Em Valor de Frota</span>
               </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10 mb-32">
          <div className="bg-fde-black p-12 text-center group hover:bg-fde-darkgray transition-colors">
            <Gem className="w-12 h-12 text-fde-purple mx-auto mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            <h3 className="text-xl font-display font-bold text-white uppercase mb-4 tracking-widest">Exclusividade</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Limitamos o número de projetos mensais para garantir atenção total a cada detalhe.</p>
          </div>
          <div className="bg-fde-black p-12 text-center group hover:bg-fde-darkgray transition-colors">
            <Users className="w-12 h-12 text-fde-purple mx-auto mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            <h3 className="text-xl font-display font-bold text-white uppercase mb-4 tracking-widest">Experts</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Equipe formada por engenheiros e designers premiados internacionalmente.</p>
          </div>
          <div className="bg-fde-black p-12 text-center group hover:bg-fde-darkgray transition-colors">
            <Wrench className="w-12 h-12 text-fde-purple mx-auto mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            <h3 className="text-xl font-display font-bold text-white uppercase mb-4 tracking-widest">Infraestrutura</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Laboratório próprio de pintura, sala limpa para PPF e dinamômetro 4x4.</p>
          </div>
        </div>

        {/* Workshop Image Banner */}
        <div className="relative h-[600px] overflow-hidden group border-y border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1550688640-5980041d876d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Elite Workshop" 
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[1.5s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-7xl md:text-9xl font-display font-bold text-white/10 uppercase tracking-widest select-none whitespace-nowrap">
              The Lab
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;