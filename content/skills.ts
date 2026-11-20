export type SkillCategory = 'backend' | 'frontend' | 'devops' | 'ai' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  /** True = Level 1 "core expertise" badge. False/omitted = Level 2 "also work with". */
  core?: boolean;
}

// Only list skills backed by a repo or an internship.
export const skills: Skill[] = [
  // ── Core expertise (Level 1) ──
  { name: 'Java 21',       category: 'backend',  core: true },
  { name: 'Spring Boot',   category: 'backend',  core: true },
  { name: 'Spring Cloud',  category: 'backend',  core: true },
  { name: 'Microservices', category: 'backend',  core: true },
  { name: 'React',         category: 'frontend', core: true },
  { name: 'Apache Kafka',  category: 'backend',  core: true },
  { name: 'PostgreSQL',    category: 'backend',  core: true },
  { name: 'Odoo 17',       category: 'backend',  core: true },

  // ── Also work with (Level 2) — Frontend ──
  { name: 'TypeScript',   category: 'frontend' },
  { name: 'Next.js',      category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },

  // ── Also work with (Level 2) — Backend ──
  { name: 'Python',  category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'MySQL',   category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'Redis',   category: 'backend' },

  // ── Also work with (Level 2) — Cloud & DevOps ──
  { name: 'Docker',         category: 'devops' },
  { name: 'Kubernetes',     category: 'devops' },
  { name: 'Helm',           category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },

  // ── Also work with (Level 2) — AI/ML ──
  { name: 'LangGraph', category: 'ai' },
  { name: 'ChromaDB',  category: 'ai' },
  { name: 'Ollama',    category: 'ai' },
  { name: 'Groq API',  category: 'ai' },
  { name: 'PyTorch',   category: 'ai' },

  // ── Also work with (Level 2) — Tools ──
  { name: 'Git',             category: 'tools' },
  { name: 'Maven',           category: 'tools' },
  { name: 'JUnit / Mockito', category: 'tools' },
  { name: 'Testcontainers',  category: 'tools' },
  { name: 'Postman',         category: 'tools' },
  { name: 'IntelliJ',        category: 'tools' },
  { name: 'Swagger',         category: 'tools' },
  { name: 'Agile/Scrum',     category: 'tools' },
];
