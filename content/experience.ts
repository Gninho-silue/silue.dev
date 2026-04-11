export interface Experience {
  id: string;
  company: string;
  roleKey: string;
  descriptionKey: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  location: string;
  remote: boolean;
  stack: string[];
}

export const experiences: Experience[] = [
  {
    id: 'pfe-techpal',
    company: 'TechPal',
    roleKey: 'experience.pfeTechpal.role',
    descriptionKey: 'experience.pfeTechpal.description',
    startDate: '2026-03',
    endDate: '2026-07',
    current: true,
    location: 'Casablanca, Maroc',
    remote: false,
    stack: ['Odoo 17', 'Python', 'Flutter', 'PostgreSQL'],
  },
  {
    id: 'techpal',
    company: 'TechPal',
    roleKey: 'experience.techpal.role',
    descriptionKey: 'experience.techpal.description',
    startDate: '2025-08',
    endDate: '2025-11',
    current: false,
    location: 'Casablanca, Maroc',
    remote: false,
    stack: ['Odoo 17', 'Python', 'PostgreSQL', 'REST API'],
  },
  {
    id: 'isb-maroc',
    company: 'ISB Maroc',
    roleKey: 'experience.isbMaroc.role',
    descriptionKey: 'experience.isbMaroc.description',
    startDate: '2024-08',
    endDate: '2024-09',
    current: false,
    location: 'Casablanca, Maroc',
    remote: false,
    stack: ['React', 'JavaScript', 'CSS', 'REST API'],
  },
];
