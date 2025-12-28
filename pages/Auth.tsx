import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Gem } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '', // atua como identificador (pode ser telefone)
    phone: '',
    location: ''
  });
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const projectInterest = searchParams.get('project');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = login(formData.email);
      if (success) {
        handleRedirect();
      } else {
        alert('Usuário não encontrado. Verifique os dados ou cadastre-se.');
      }
    } else {
      register(formData);
      handleRedirect();
    }
  };

  const handleRedirect = () => {
    if (projectInterest) {
      // Se veio pelo interesse em um carro, redireciona pro WhatsApp
      const message = `Olá! Acabei de me cadastrar no Full Drop Elite. Tenho interesse no projeto: ${projectInterest}.`;
      window.location.href = `https://wa.me/258862560607?text=${encodeURIComponent(message)}`;
    } else if (redirect) {
      navigate(redirect);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-fde-black flex flex-col items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full bg-fde-darkgray/50 border border-white/10 p-8 rounded-lg backdrop-blur-sm">
        <div className="text-center mb-8">
          <Gem className="w-12 h-12 text-fde-purple mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
            {isLogin ? 'Acesso Elite' : 'Cadastrar-se'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {isLogin ? 'Entre para gerenciar sua experiência' : 'Junte-se ao clube exclusivo'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-fde-purple outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Localização (Cidade/Bairro)</label>
                 <input
                  type="text"
                  required
                  className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-fde-purple outline-none"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="Ex: Maputo, Polana"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              {isLogin ? 'Email ou Telefone' : 'Email'}
            </label>
            <input
              type="text"
              required
              className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-fde-purple outline-none"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone / WhatsApp</label>
              <input
                type="tel"
                required
                className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-fde-purple outline-none"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          )}

          <Button type="submit" fullWidth className="mt-6">
            {isLogin ? 'Entrar' : 'Finalizar Cadastro'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 hover:text-fde-purple text-sm underline underline-offset-4"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Fazer Login'}
          </button>
        </div>
        
        {isLogin && (
            <div className="mt-4 p-3 bg-fde-purple/10 border border-fde-purple/30 text-xs text-gray-300 rounded">
                <span className="font-bold text-fde-purple block mb-1">Acesso Administrativo (Demo):</span>
                Email: admin@fulldrop.com
            </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;