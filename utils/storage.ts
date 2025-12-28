import { Project, User, Lead, CarCategory } from '../types';

// Dados iniciais para popular o "banco de dados" com foco em Moçambique
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Toyota Mark X 250G',
    category: CarCategory.SEDAN,
    tags: ['Stance', 'VIP Style', 'Maputo'],
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Mark X rebaixado com suspensão a ar, jantes 19" cromadas, kit G-s e faróis personalizados smoke.'
  },
  {
    id: '2',
    title: 'Lexus IS 250 F-Sport',
    category: CarCategory.SEDAN,
    tags: ['Bodykit', 'Performance'],
    imageUrl: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Conversão frontal para modelo 2021, difusor traseiro, escape de 4 saídas e envelopamento Nardo Grey.'
  },
  {
    id: '3',
    title: 'Toyota Corolla GR Widebody',
    category: CarCategory.HATCHBACK,
    tags: ['Racing', 'Turbo'],
    imageUrl: 'https://images.unsplash.com/photo-1629897034789-f53874313f89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Kit Widebody artesanal, capô de fibra de carbono, jantes Enkei e upgrade de turbo.'
  },
  {
    id: '4',
    title: 'Toyota Ractis Custom',
    category: CarCategory.HATCHBACK,
    tags: ['Clean', 'Jantes'],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Projeto Clean Look: Jantes 17" BBS, sistema de som high-end e interior em couro personalizado.'
  },
  {
    id: '5',
    title: 'Toyota Hilux GR Sport',
    category: CarCategory.PICKUP,
    tags: ['Off-Road', '4x4'],
    imageUrl: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Kit de elevação IronMan, pneus Mud Terrain 33", barra de LED e pintura Raptor preta.'
  },
  {
    id: '6',
    title: 'Subaru WRX STI',
    category: CarCategory.SPORT,
    tags: ['Rally', 'JDM'],
    imageUrl: 'https://images.unsplash.com/photo-1615396784656-b072f0995c69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Configuração de rua agressiva, aileron GT Wing, escape full inox e jantes douradas clássicas.'
  },
  {
    id: '7',
    title: 'Toyota Altezza RS200',
    category: CarCategory.SEDAN,
    tags: ['Drift', 'JDM'],
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Kit Turbo HKS, camber negativo, volante esportivo e pintura Midnight Purple.'
  },
  {
    id: '8',
    title: 'Toyota Fortuner TRD',
    category: CarCategory.SUV,
    tags: ['Familia', 'Luxo'],
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Chrome delete (tudo preto), jantes 22", estribos elétricos e interior Alcantara.'
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
    return JSON.parse(stored);
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

  // Simples login mockado
  login: (email: string): User | null => {
    // Backdoor para ADMIN
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