export enum CarCategory {
  ALL = 'Todos',
  SUV = 'SUV',
  SEDAN = 'Sedan',
  COUPE = 'Coupé',
  HATCHBACK = 'Hatchback',
  PICKUP = 'Pickup',
  OFFROAD = 'Off-Road',
  SPORT = 'Esportivos',
  TOURING = 'Turismo',
}

export interface Project {
  id: string;
  title: string;
  category: CarCategory;
  tags: string[];
  imageUrl: string;
  description: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export type UserRole = 'ADMIN' | 'CLIENT';

export interface User {
  id: string;
  name: string;
  email: string; // ou telefone
  role: UserRole;
  location?: string;
  phone?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userLocation: string;
  interestedInProjectId: string;
  projectTitle: string;
  timestamp: string;
}