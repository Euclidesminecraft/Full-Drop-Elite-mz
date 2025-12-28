import React, { useState } from 'react';
import { MessageCircle, Instagram, Send, ArrowRight, Phone, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    carModel: '',
    idea: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitação VIP enviada! Nossa equipe entrará em contato em até 2 horas.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-fde-black pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        
        {/* Info Side */}
        <div className="bg-black p-12 lg:p-24 flex flex-col justify-center border-r border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fde-purple to-black"></div>
          
          <span className="text-fde-purple font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-fde-purple"></span> Contato VIP
          </span>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-white uppercase mb-8 leading-none tracking-tighter">
            Vamos criar<br/>algo <span className="text-gray-600">único.</span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-8 max-w-md font-light leading-relaxed">
            Estamos prontos para ouvir sua visão. Entre em contato diretamente pelos nossos canais oficiais em Maputo.
          </p>

          <a href="https://share.google/SYPhsAgcUU6S4loBe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-10 group">
             <MapPin className="text-fde-purple group-hover:scale-110 transition-transform" />
             <span className="text-lg underline decoration-fde-purple/30 underline-offset-4 group-hover:decoration-fde-purple">Maputo, Moçambique</span>
          </a>

          <div className="space-y-4">
            <a href="https://wa.me/258824410088" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-white hover:text-fde-purple transition-all duration-300 group p-6 border border-white/10 hover:border-fde-purple bg-fde-darkgray/30">
              <div className="flex items-center gap-4">
                <MessageCircle className="w-6 h-6 text-gray-400 group-hover:text-fde-purple transition-colors" />
                <div>
                  <span className="block font-display font-bold text-xl uppercase tracking-wide">WhatsApp</span>
                  <span className="text-gray-500 text-xs uppercase tracking-widest group-hover:text-white">+258 82 441 0088</span>
                </div>
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </a>

            <a href="tel:+258864410088" className="flex items-center justify-between text-white hover:text-fde-purple transition-all duration-300 group p-6 border border-white/10 hover:border-fde-purple bg-fde-darkgray/30">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-gray-400 group-hover:text-fde-purple transition-colors" />
                <div>
                  <span className="block font-display font-bold text-xl uppercase tracking-wide">Ligar Agora</span>
                  <span className="text-gray-500 text-xs uppercase tracking-widest group-hover:text-white">+258 86 441 0088</span>
                </div>
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </a>
            
            <a href="#" className="flex items-center justify-between text-white hover:text-fde-purple transition-all duration-300 group p-6 border border-white/10 hover:border-fde-purple bg-fde-darkgray/30">
              <div className="flex items-center gap-4">
                <Instagram className="w-6 h-6 text-gray-400 group-hover:text-fde-purple transition-colors" />
                <div>
                  <span className="block font-display font-bold text-xl uppercase tracking-wide">Instagram</span>
                  <span className="text-gray-500 text-xs uppercase tracking-widest group-hover:text-white">@FullDropElite</span>
                </div>
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-fde-darkgray/20 p-12 lg:p-24 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto w-full">
            
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest group-focus-within:text-fde-purple transition-colors">Nome Completo</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-fde-purple transition-all placeholder-gray-700 text-lg font-sans"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest group-focus-within:text-fde-purple transition-colors">Telefone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-fde-purple transition-all placeholder-gray-700 text-lg font-sans"
                    placeholder="+258..."
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest group-focus-within:text-fde-purple transition-colors">E-mail</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-fde-purple transition-all placeholder-gray-700 text-lg font-sans"
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest group-focus-within:text-fde-purple transition-colors">Veículo Atual</label>
                <input 
                  type="text" 
                  name="carModel"
                  required
                  value={formState.carModel}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-fde-purple transition-all placeholder-gray-700 text-lg font-sans"
                  placeholder="Modelo e Ano"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest group-focus-within:text-fde-purple transition-colors">Detalhes do Projeto</label>
                <textarea 
                  name="idea"
                  rows={3}
                  value={formState.idea}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-fde-purple transition-all resize-none placeholder-gray-700 text-lg font-sans"
                  placeholder="Descreva suas expectativas..."
                ></textarea>
              </div>
            </div>

            <Button type="submit" fullWidth className="mt-8 text-xl py-5">
              Enviar Solicitação VIP <Send className="w-5 h-5 ml-3" />
            </Button>
            
            <p className="text-center text-gray-600 text-xs mt-4">
              Seus dados estão protegidos. Entraremos em contato com discrição total.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;