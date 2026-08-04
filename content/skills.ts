export type SkillCategory = 'backend' | 'frontend' | 'devops' | 'mobile' | 'ai' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  /** True = Level 1 "core expertise" badge. False/omitted = Level 2 "also work with". */
  core?: boolean;
}

export const skills: Skill[] = [
  // ── Core expertise (Level 1) ──
  { name: 'Java 21',       category: 'backend',  core: true },
  { name: 'Spring Boot',   category: 'backend',  core: true },
  { name: 'Spring Cloud',  category: 'backend',  core: true },
  { name: 'Microservices', category: 'backend',  core: true },
  { name: 'React',         category: 'frontend', core: true },
  { name: 'Kubernetes',    category: 'devops',   core: true },
  { name: 'Apache Kafka',  category: 'backend',  core: true },
  { name: 'PostgreSQL',    category: 'backend',  core: true },

  // ── Also work with (Level 2) — Frontend ──
  { name: 'TypeScript',   category: 'frontend' },
  { name: 'Next.js',      category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Redux',        category: 'frontend' },

  // ── Also work with (Level 2) — Backend ──
  { name: 'Python',  category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'MySQL',   category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'Redis',   category: 'backend' },

  // ── Also work with (Level 2) — Cloud & DevOps ──
  { name: 'Docker',         category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },
  { name: 'Helm',           category: 'devops' },
  { name: 'Jenkins',        category: 'devops' },
  { name: 'Terraform',      category: 'devops' },

  // ── Also work with (Level 2) — Mobile ──
  { name: 'Flutter',               category: 'mobile' },
  { name: 'Android (Java/Kotlin)', category: 'mobile' },

  // ── Also work with (Level 2) — AI/ML ──
  { name: 'Groq API',    category: 'ai' },
  { name: 'HuggingFace', category: 'ai' },
  { name: 'PyTorch',     category: 'ai' },
  { name: 'LangGraph',   category: 'ai' },

  // ── Also work with (Level 2) — Tools ──
  { name: 'Git',         category: 'tools' },
  { name: 'Maven',       category: 'tools' },
  { name: 'Postman',     category: 'tools' },
  { name: 'IntelliJ',    category: 'tools' },
  { name: 'Swagger',     category: 'tools' },
  { name: 'Agile/Scrum', category: 'tools' },
];
