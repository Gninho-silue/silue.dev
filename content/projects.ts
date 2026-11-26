export type ProjectCategory = 'fullstack' | 'mobile' | 'ai' | 'devops' | 'saas';

/** Why the source code is not public. Shown as a badge instead of the Code link. */
export type PrivateCodeReason = 'client' | 'personalData';

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  stack: string[];
  github?: string;
  live?: string;
  privateCode?: PrivateCodeReason;
  featured: boolean;
  /** Screenshot shown at the top of the card, in a 2:1 frame. */
  image: string;
  /** "contain" shows the whole image (for images far from 2:1); default "cover". */
  imageFit?: 'cover' | 'contain';
  /** Clicking the image opens it full size (for diagrams too small to read in the card). */
  imageZoom?: boolean;
  category: ProjectCategory;
  inProgress?: boolean;
  year?: number;
}

export const projects: Project[] = [
  {
    id: 'banking-ms',
    titleKey: 'projects.bankingMs.title',
    descriptionKey: 'projects.bankingMs.description',
    stack: ['Java 21', 'Spring Boot', 'Spring Cloud', 'Kafka', 'MySQL', 'Keycloak', 'Testcontainers'],
    github: 'https://github.com/Gninho-silue/banking-microservices',
    featured: true,
    image: '/projects/banking-architecture-full.png',
    imageZoom: true,
    category: 'fullstack',
    year: 2026,
  },
  {
    id: 'jobpilot',
    titleKey: 'projects.jobpilot.title',
    descriptionKey: 'projects.jobpilot.description',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Postgres (Supabase)', 'Clerk', 'Groq', 'Playwright'],
    github: 'https://github.com/Gninho-silue/jobpilot',
    live: 'https://jobpilot-jet.vercel.app',
    featured: true,
    image: '/projects/jobpilot-v2.png',
    category: 'saas',
    year: 2026,
  },
  {
    id: 'cortex',
    titleKey: 'projects.cortex.title',
    descriptionKey: 'projects.cortex.description',
    stack: ['Python', 'FastAPI', 'LangGraph', 'ChromaDB', 'React', 'TypeScript', 'Docker'],
    live: 'https://cortex-tau-five.vercel.app',
    privateCode: 'personalData',
    featured: true,
    image: '/projects/cortex.png',
    category: 'ai',
  },
  {
    id: 'devscope',
    titleKey: 'projects.devscope.title',
    descriptionKey: 'projects.devscope.description',
    stack: ['Next.js', 'TypeScript', 'Groq AI', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/Gninho-silue/devscope',
    live: 'https://devscope-lake.vercel.app',
    featured: false,
    image: '/projects/devscope.png',
    category: 'ai',
    year: 2026,
  },
  {
    id: 'agent-flow',
    titleKey: 'projects.agentFlow.title',
    descriptionKey: 'projects.agentFlow.description',
    stack: ['Python', 'LangGraph', 'FastAPI', 'Groq / Ollama', 'Render', 'Vercel'],
    github: 'https://github.com/Gninho-silue/agentflow',
    live: 'https://agentflow-alpha-azure.vercel.app',
    featured: false,
    image: '/projects/agentflow-v2.png',
    category: 'ai',
    year: 2026,
  },
  {
    id: 'taskpro',
    titleKey: 'projects.taskpro.title',
    descriptionKey: 'projects.taskpro.description',
    stack: ['Spring Boot', 'React', 'PostgreSQL', 'WebSocket', 'JWT'],
    github: 'https://github.com/Gninho-silue/taskpro',
    featured: false,
    image: '/projects/taskpro.png',
    category: 'fullstack',
    year: 2025,
  },
  {
    id: 'pfe-techpal',
    titleKey: 'projects.pfeTechpal.title',
    descriptionKey: 'projects.pfeTechpal.description',
    stack: ['Odoo 17', 'Python', 'Flutter', 'PostgreSQL'],
    privateCode: 'client',
    featured: false,
    image: '/projects/pfe-techpal.png',
    category: 'mobile',
    year: 2026,
  },
  {
    id: 'recommender-system',
    titleKey: 'projects.recommenderSystem.title',
    descriptionKey: 'projects.recommenderSystem.description',
    stack: ['Python', 'PyTorch', 'AWS SageMaker', 'Streamlit'],
    github: 'https://github.com/Gninho-silue/recommender-system',
    featured: false,
    image: '/projects/recommender-system.png',
    imageFit: 'contain',
    category: 'ai',
    year: 2025,
  },
];
