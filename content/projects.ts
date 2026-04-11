export type ProjectCategory = 'fullstack' | 'mobile' | 'ai' | 'devops';

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  stack: string[];
  github: string;
  live?: string;
  featured: boolean;
  image: string;
  category: ProjectCategory;
  inProgress?: boolean;
}

export const projects: Project[] = [
  {
    id: 'devscope',
    titleKey: 'projects.devscope.title',
    descriptionKey: 'projects.devscope.description',
    stack: ['Next.js', 'TypeScript', 'Groq AI', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/Gninho-silue/devscope',
    live: 'https://devscope-lake.vercel.app',
    featured: true,
    image: '/projects/devscope.png',
    category: 'ai',
  },
  {
    id: 'banking-ms',
    titleKey: 'projects.bankingMs.title',
    descriptionKey: 'projects.bankingMs.description',
    stack: ['Java 21', 'Spring Cloud', 'Kafka', 'Kubernetes', 'Docker', 'PostgreSQL'],
    github: 'https://github.com/Gninho-silue/banking-microservices',
    featured: true,
    image: '/projects/banking-ms.png',
    category: 'fullstack',
  },
  {
    id: 'taskpro',
    titleKey: 'projects.taskpro.title',
    descriptionKey: 'projects.taskpro.description',
    stack: ['Spring Boot', 'React', 'PostgreSQL', 'WebSocket', 'JWT'],
    github: 'https://github.com/Gninho-silue/taskpro',
    featured: true,
    image: '/projects/taskpro.png',
    category: 'fullstack',
  },
  {
    id: 'smartcollab',
    titleKey: 'projects.smartcollab.title',
    descriptionKey: 'projects.smartcollab.description',
    stack: ['Node.js', 'TypeScript', 'React', 'Redis', 'Socket.io'],
    github: 'https://github.com/Gninho-silue/smartcollab',
    featured: false,
    image: '/projects/smartcollab.png',
    category: 'fullstack',
  },
  {
    id: 'pfe-techpal',
    titleKey: 'projects.pfeTechpal.title',
    descriptionKey: 'projects.pfeTechpal.description',
    stack: ['Odoo 17', 'Python', 'Flutter', 'PostgreSQL'],
    github: 'https://github.com/Gninho-silue/pfe-techpal',
    featured: false,
    image: '/projects/pfe-techpal.png',
    category: 'mobile',
    inProgress: true,
  },
];
