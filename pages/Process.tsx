import React from 'react';
import { PROCESS_STEPS } from '../constants';
import * as Icons from 'lucide-react';
import Button from '../components/ui/Button';

const Process: React.FC = () => {
  return (
    <div className="min-h-screen bg-fde-black pt-20">
      <div className="bg-[url('https://images.unsplash.com/photo-1626847037466-267988358485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative py-32 bg-fixed">
        <div className="absolute inset-0 bg-black/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-fde-purple font-bold text-sm tracking-widest uppercase mb-4 block animate-pulse">Metodologia Exclusiva</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter mb-8">
            O Processo <span className="text-fde-purple">Elite</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            A perfeição não aceita atalhos. Nossa metodologia foi desenvolvida para garantir que cada detalhe do seu projeto seja executado com precisão cirúrgica.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fde-purple via-white/10 to-transparent hidden md:block"></div>
          
          <div className="space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              // @ts-ignore
              const IconComponent = Icons[step.icon] || Icons.HelpCircle;
              const isEven = index % 2 === 0;

              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Side */}
                  <div className="flex-1 text-left md:text-right">
                    <div className={`${isEven ? 'md:text-left' : 'md:text-right'} relative group`}>
                      <span className={`absolute -top-10 text-8xl font-display font-bold text-white/[0.03] group-hover:text-fde-purple/[0.05] transition-colors -z-10 ${isEven ? 'left-0' : 'right-0'}`}>0{step.id}</span>
                      <h3 className="text-3xl font-display font-bold text-white uppercase mb-4 tracking-wide group-hover:text-fde-purple transition-colors">{step.title}</h3>
                      <p className="text-gray-400 text-lg font-light leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Icon Center */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-20 h-20 bg-black flex items-center justify-center rounded-full border border-white/20 shadow-[0_0_30px_rgba(147,51,234,0.15)] group-hover:border-fde-purple transition-colors duration-500">
                      <IconComponent className="text-white w-8 h-8 group-hover:text-fde-purple transition-colors" />
                    </div>
                  </div>

                  {/* Empty Side */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-32 text-center">
          <div className="p-12 border border-white/10 bg-fde-darkgray/30 backdrop-blur-md">
            <h3 className="text-3xl font-display font-bold text-white uppercase mb-8">Seu carro merece o melhor</h3>
            <Button to="/contact" fullWidth className="max-w-md mx-auto">Agendar Consultoria</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;