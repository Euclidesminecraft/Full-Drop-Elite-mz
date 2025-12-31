import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag, MessageCircle, FileText } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
        setIsCartOpen(false);
        navigate('/auth?redirect=cart');
        return;
    }

    const itemsList = cart.map(item => `- ${item.title} (Ref: ${item.id})`).join('\n');
    const message = `Olá! Sou ${user.name}. Gostaria de solicitar um orçamento para os seguintes itens da minha lista de desejos:\n\n${itemsList}\n\nFico no aguardo de informações sobre disponibilidade e valores.`;
    
    window.open(`https://wa.me/258862560607?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-[70] transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <FileText className="text-fde-purple" />
                <h2 className="font-display font-bold text-2xl uppercase text-white tracking-wider">Lista de Cotação</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <ShoppingBag size={48} className="mb-4 text-gray-600" />
                    <p className="text-gray-400 font-sans">Sua lista está vazia.</p>
                </div>
            ) : (
                cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-fde-purple/30 transition-colors">
                        {/* Thumbnail Aumentada para w-24 h-24 */}
                        <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-sm" />
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-display font-bold text-white text-lg leading-none mb-1">{item.title}</h4>
                                <span className="text-xs text-gray-500 uppercase">{item.category}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-400 text-xs font-sans uppercase tracking-widest border border-white/10 px-2 py-1 rounded">Sob Consulta</span>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
            <div className="p-6 bg-white/5 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 uppercase text-sm tracking-widest">Itens na Lista</span>
                    <span className="text-2xl font-display font-bold text-white">{cart.length}</span>
                </div>
                <Button onClick={handleCheckout} fullWidth className="flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> Solicitar Orçamento
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                    Você será redirecionado para o WhatsApp para confirmar detalhes.
                </p>
            </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;