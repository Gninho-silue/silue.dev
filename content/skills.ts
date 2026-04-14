export type SkillCategory = 'backend' | 'frontend' | 'devops' | 'database' | 'mobile' | 'ai';

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

export const skills: Skill[] = [
  // Backend
  { name: 'Java 21',      level: 90, category: 'backend' },
  { name: 'Spring Boot',  level: 88, category: 'backend' },
  { name: 'Node.js',      level: 80, category: 'backend' },
  { name: 'Kafka',        level: 72, category: 'backend' },
  { name: 'Express',      level: 75, category: 'backend' },
  { name: 'Python',       level: 70, category: 'backend' },

  // Frontend
  { name: 'HTML / CSS',   level: 88, category: 'frontend' },
  { name: 'React',        level: 85, category: 'frontend' },
  { name: 'JavaScript',   level: 80, category: 'frontend' },
  { name: 'Next.js',       level: 60, category: 'frontend' },
  { name: 'TypeScript',   level: 82, category: 'frontend' },
  { name: 'Tailwind CSS', level: 80, category: 'frontend' },
  { name: 'Redux',        level: 70, category: 'frontend' },

  // DevOps
  { name: 'Docker',          level: 78, category: 'devops' },
  { name: 'GitHub Actions',  level: 75, category: 'devops' },
  { name: 'Kubernetes',      level: 70, category: 'devops' },
  { name: 'Helm',            level: 65, category: 'devops' },
  { name: 'Jenkins',         level: 60, category: 'devops' },

  // Database
  { name: 'PostgreSQL', level: 82, category: 'database' },
  { name: 'MySQL',      level: 75, category: 'database' },
  { name: 'MongoDB',    level: 72, category: 'database' },
  { name: 'Redis',      level: 70, category: 'database' },

  // Mobile
  { name: 'Flutter',                      level: 45, category: 'mobile' },
  { name: 'Android (Java/Kotlin)',         level: 45, category: 'mobile' },

  // AI/ML
  { name: 'Groq API',    level: 70, category: 'ai' },
  { name: 'HuggingFace', level: 55, category: 'ai' },
  { name: 'PyTorch',     level: 50, category: 'ai' },
];

export const tools = [
  'Git', 'Maven', 'Gradle', 'Keycloak', 'Postman',
  'IntelliJ', 'Jira', 'Swagger',
] as const;
