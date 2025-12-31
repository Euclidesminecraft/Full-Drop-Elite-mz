import { Project, User, Lead, CarCategory } from '../types';

// Dados com foco em JDM populares em Moçambique e Europeus
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Toyota Mark X 250G "Reaper"',
    category: CarCategory.SEDAN,
    tags: ['Stance', 'VIP Style', 'Toyota'],
    imageUrl: 'https://images.unsplash.com/photo-1621253075841-39656461f308?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'O rei das ruas. Mark X com bodykit Modellista, suspensão a ar, jantes 19" Work e faróis smoke personalizados.',
    price: 650000
  },
  {
    id: '2',
    title: 'Toyota Ractis "Urban Pod"',
    category: CarCategory.HATCHBACK,
    tags: ['Clean', 'Daily', 'Toyota'],
    imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Transformação completa para dia-a-dia: Sistema de som Pioneer Competition, jantes 17" BBS e interior em couro.',
    price: 350000
  },
  {
    id: '3',
    title: 'VW Golf 7 GTI "Storm"',
    category: CarCategory.HATCHBACK,
    tags: ['Racing', 'Euro', 'VW'],
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Stage 2 ECU Remap, intake de carbono, escape Akrapovič e kit estético Oettinger completo.',
    price: 1250000
  },
  {
    id: '4',
    title: 'BMW 320i M-Sport (F30)',
    category: CarCategory.SEDAN,
    tags: ['Luxo', 'Drift', 'BMW'],
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980adade?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Conversão M3 Look, difusor em fibra de carbono, volante M-Performance com display e pintura Frozen Black.',
    price: 1100000
  },
  {
    id: '5',
    title: 'Toyota Hilux "Dark Matter"',
    category: CarCategory.PICKUP,
    tags: ['Off-Road', '4x4', 'Toyota'],
    imageUrl: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Kit de elevação IronMan 2", pneus Mud Terrain 33", grade TRD e pintura Raptor preta texturizada.',
    price: 1850000
  },
  {
    id: '6',
    title: 'Subaru WRX STI "Rally Spec"',
    category: CarCategory.SPORT,
    tags: ['Rally', 'JDM', 'Subaru'],
    imageUrl: 'https://images.unsplash.com/photo-1615396784656-b072f0995c69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Configuração clássica JDM: Jantes douradas, escape Invidia N1 full titanium e capô de carbono Varis.',
    price: 1400000
  },
  {
    id: '7',
    title: 'Toyota Altezza / IS200',
    category: CarCategory.SEDAN,
    tags: ['Drift', 'Clássico', 'Toyota'],
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'O clássico de tração traseira. Kit Turbo HKS, camber negativo agressivo e volante esportivo Nardi.',
    price: 550000
  },
  {
    id: '8',
    title: 'BMW 1 Series "Pocket Rocket"',
    category: CarCategory.HATCHBACK,
    tags: ['Euro', 'Stance', 'BMW'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Rebaixado na medida certa. Jantes 18" Rotiform, faróis Angel Eyes personalizados e lip frontal.',
    price: 850000
  }
];

const KEYS = {
  PROJECTS: 'fde_projects',
  USERS: 'fde_users',
  LEADS: 'fde_leads',
  CURRENT_USER: 'fde_current_user'
};

export const storage = {
  getProjects: (): Project[] => {
    const stored = localStorage.getItem(KEYS.PROJECTS);
    if (!stored) {
      localStorage.setItem(KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    // Check rápido para ver se precisamos atualizar dados antigos (dev mode)
    const parsed = JSON.parse(stored);
    if (parsed.length > 0 && !parsed.find((p: Project) => p.title.includes('Mark X'))) {
         localStorage.setItem(KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
         return INITIAL_PROJECTS;
    }
    return parsed;
  },

  saveProject: (project: Project) => {
    const projects = storage.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  },

  deleteProject: (id: string) => {
    const projects = storage.getProjects().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  },

  getUsers: (): User[] => {
    const stored = localStorage.getItem(KEYS.USERS);
    return stored ? JSON.parse(stored) : [];
  },

  saveUser: (user: User) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },

  getLeads: (): Lead[] => {
    const stored = localStorage.getItem(KEYS.LEADS);
    return stored ? JSON.parse(stored) : [];
  },

  saveLead: (lead: Lead) => {
    const leads = storage.getLeads();
    leads.push(lead);
    localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  },

  login: (email: string): User | null => {
    if (email === 'admin@fulldrop.com' || email === '+258862560607') {
      return {
        id: 'admin',
        name: 'Administrador Elite',
        email: email,
        role: 'ADMIN',
        location: 'Maputo HQ',
        createdAt: new Date().toISOString()
      };
    }
    const users = storage.getUsers();
    return users.find(u => u.email === email || u.phone === email) || null;
  }
};

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
        style: 'currency',
        currency: 'MZN',
        minimumFractionDigits: 0
    }).format(value);
};