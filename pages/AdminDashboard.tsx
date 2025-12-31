import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../utils/storage';
import { User, Lead, Project, CarCategory } from '../types';
import { useNavigate } from 'react-router-dom';
import { Users, LayoutGrid, Save, Trash2, MapPin, Phone, Upload, Image as ImageIcon, X } from 'lucide-react';
import Button from '../components/ui/Button';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'leads' | 'projects'>('leads');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Data State
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Editing State
  const [editingProject, setEditingProject] = useState<Partial<Project>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    loadData();
  }, [user, isAdmin, navigate]);

  const loadData = () => {
    setUsers(storage.getUsers());
    setProjects(storage.getProjects());
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProject(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.imageUrl) {
        alert("Título e Imagem são obrigatórios.");
        return;
    }

    const newProject: Project = {
      id: editingProject.id || Date.now().toString(),
      title: editingProject.title!,
      category: editingProject.category || CarCategory.SEDAN,
      tags: typeof editingProject.tags === 'string' ? (editingProject.tags as string).split(',').map(t => t.trim()) : (editingProject.tags || []),
      imageUrl: editingProject.imageUrl!,
      description: editingProject.description || '',
      price: editingProject.price
    };

    try {
        storage.saveProject(newProject);
        setIsEditing(false);
        setEditingProject({});
        loadData();
    } catch (error) {
        alert("Erro ao salvar. A imagem pode ser muito grande para o armazenamento local.");
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Tem certeza que deseja remover este projeto?')) {
      storage.deleteProject(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-fde-black pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-display font-bold text-white uppercase">Painel <span className="text-fde-purple">ADM</span></h1>
          <div className="flex gap-4">
             <button 
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === 'leads' ? 'bg-fde-purple text-white' : 'bg-fde-darkgray text-gray-400'}`}
             >
                <Users size={18} /> Fluxo de Clientes
             </button>
             <button 
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-fde-purple text-white' : 'bg-fde-darkgray text-gray-400'}`}
             >
                <LayoutGrid size={18} /> Editar Páginas
             </button>
          </div>
        </div>

        {activeTab === 'leads' && (
          <div className="bg-fde-darkgray/50 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black/50 text-fde-purple uppercase text-sm font-bold">
                  <tr>
                    <th className="p-4">Nome</th>
                    <th className="p-4">Contato</th>
                    <th className="p-4">Localização</th>
                    <th className="p-4">Data Registro</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {users.filter(u => u.role !== 'ADMIN').map((client) => (
                    <tr key={client.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white">{client.name}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                            <span>{client.email}</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1"><Phone size={10} /> {client.phone}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                             <MapPin size={14} className="text-fde-purple" />
                             {client.location || 'Não informado'}
                        </div>
                      </td>
                      <td className="p-4 text-sm">{new Date(client.createdAt).toLocaleDateString()}</td>
                      <td className="p-4"><span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">Ativo</span></td>
                    </tr>
                  ))}
                  {users.length <= 1 && (
                    <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">Nenhum cliente registrado ainda.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8">
            {/* Form de Edição */}
            <div className="bg-fde-darkgray border border-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h3>
                <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                        className="bg-black/50 border border-white/10 p-3 text-white rounded focus:border-fde-purple outline-none" 
                        placeholder="Título do Projeto"
                        value={editingProject.title || ''}
                        onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                    />
                    
                    <select 
                        className="bg-black/50 border border-white/10 p-3 text-white rounded focus:border-fde-purple outline-none"
                        value={editingProject.category || ''}
                        onChange={e => setEditingProject({...editingProject, category: e.target.value as CarCategory})}
                    >
                        {Object.values(CarCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    {/* Area de Upload de Imagem */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-xs text-gray-400 uppercase font-bold">Imagem do Carro</label>
                        <div className="flex items-start gap-4">
                            {/* Preview */}
                            <div className="w-32 h-24 bg-black border border-white/10 rounded overflow-hidden flex items-center justify-center relative group">
                                {editingProject.imageUrl ? (
                                    <>
                                        <img src={editingProject.imageUrl} className="w-full h-full object-cover" />
                                        <button 
                                            type="button"
                                            onClick={() => setEditingProject({...editingProject, imageUrl: ''})}
                                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                                        >
                                            <X size={24} />
                                        </button>
                                    </>
                                ) : (
                                    <ImageIcon className="text-gray-600" />
                                )}
                            </div>
                            
                            {/* Inputs */}
                            <div className="flex-1 space-y-2">
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <div className="flex gap-2">
                                    <button 
                                        type="button"
                                        onClick={triggerFileInput}
                                        className="flex items-center gap-2 bg-fde-purple/20 text-fde-purple border border-fde-purple px-4 py-2 rounded hover:bg-fde-purple hover:text-white transition-colors"
                                    >
                                        <Upload size={18} /> Carregar Foto
                                    </button>
                                    <input 
                                        className="flex-1 bg-black/50 border border-white/10 p-2 text-white text-sm rounded focus:border-fde-purple outline-none" 
                                        placeholder="Ou cole uma URL externa aqui..."
                                        value={editingProject.imageUrl || ''}
                                        onChange={e => setEditingProject({...editingProject, imageUrl: e.target.value})}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Recomendado: 1920x1080px ou similar. Max 2MB para performance.</p>
                            </div>
                        </div>
                    </div>

                    <input 
                        className="bg-black/50 border border-white/10 p-3 text-white rounded focus:border-fde-purple outline-none" 
                        placeholder="Tags (separadas por vírgula)"
                        value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags || ''}
                        onChange={e => setEditingProject({...editingProject, tags: e.target.value})}
                    />
                    <input 
                        type="number"
                        className="bg-black/50 border border-white/10 p-3 text-white rounded focus:border-fde-purple outline-none" 
                        placeholder="Preço Estimado (Opcional)"
                        value={editingProject.price || ''}
                        onChange={e => setEditingProject({...editingProject, price: Number(e.target.value)})}
                    />
                    <textarea 
                        className="bg-black/50 border border-white/10 p-3 text-white rounded md:col-span-2 focus:border-fde-purple outline-none" 
                        placeholder="Descrição"
                        rows={3}
                        value={editingProject.description || ''}
                        onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                    />
                    <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                        {isEditing && <button type="button" onClick={() => {setIsEditing(false); setEditingProject({});}} className="text-gray-400 hover:text-white">Cancelar</button>}
                        <Button type="submit"><Save size={18} className="mr-2"/> Salvar Projeto</Button>
                    </div>
                </form>
            </div>

            {/* Lista de Projetos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                    <div key={p.id} className="bg-fde-darkgray border border-white/10 rounded overflow-hidden group">
                        {/* Imagem de Prévia aumentada para h-60 */}
                        <div className="relative h-60">
                            <img src={p.imageUrl} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                                <button 
                                    onClick={() => { setEditingProject(p); setIsEditing(true); window.scrollTo(0,0); }}
                                    className="bg-fde-purple text-white p-2 rounded hover:bg-white hover:text-black"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => handleDeleteProject(p.id)}
                                    className="bg-red-600 text-white p-2 rounded hover:bg-white hover:text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-white">{p.title}</h4>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-fde-purple uppercase">{p.category}</span>
                                {p.price && <span className="text-xs text-gray-500">Ref: {p.price}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;