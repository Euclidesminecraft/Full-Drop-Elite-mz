import { CarCategory, Project, NavItem, ProcessStep } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Galeria Elite', path: '/gallery' },
  { label: 'Processo', path: '/process' },
  { label: 'A Marca', path: '/about' },
  { label: 'Contato', path: '/contact' },
];

// Fallback data (Sync with storage.ts if needed for SSR/Static renders)
export const PROJECTS: Project[] = [
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
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Consultoria Elite',
    description: 'Análise detalhada do veículo e alinhamento de expectativas.',
    icon: 'MessageSquare'
  },
  {
    id: 2,
    title: 'Design 3D Exclusivo',
    description: 'Visualização fotorrealista do projeto antes de tocar no carro.',
    icon: 'PenTool'
  },
  {
    id: 3,
    title: 'Logística Premium',
    description: 'Transporte fechado e seguro do seu veículo até nossa sede.',
    icon: 'Truck'
  },
  {
    id: 4,
    title: 'Transformação',
    description: 'Execução técnica por mestres artesãos automotivos.',
    icon: 'Wrench'
  },
  {
    id: 5,
    title: 'A Revelação',
    description: 'Entrega cerimonial do seu novo veículo.',
    icon: 'Trophy'
  }
];