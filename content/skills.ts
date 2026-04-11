export type SkillCategory = 'backend' | 'frontend' | 'devops' | 'database' | 'mobile' | 'ai';

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

export const skills: Skill[] = [
  // Backend
  { name: 'Java 21', level: 85, category: 'backend' },
  { name: 'Spring Boot', level: 85, category: 'backend' },
  { name: 'Node.js', level: 80, category: 'backend' },
  { name: 'Python', level: 75, category: 'backend' },
  { name: 'Express', level: 75, category: 'backend' },

  // Frontend
  { name: 'React', level: 85, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Next.js', level: 80, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'Redux', level: 70, category: 'frontend' },

  // DevOps
  { name: 'Docker', level: 80, category: 'devops' },
  { name: 'Kubernetes', level: 65, category: 'devops' },
  { name: 'Kafka', level: 65, category: 'devops' },
  { name: 'GitHub Actions', level: 75, category: 'devops' },

  // Database
  { name: 'PostgreSQL', level: 80, category: 'database' },
  { name: 'MySQL', level: 75, category: 'database' },
  { name: 'MongoDB', level: 70, category: 'database' },
  { name: 'Redis', level: 65, category: 'database' },

  // Mobile
  { name: 'Flutter', level: 45, category: 'mobile' },

  // AI/ML
  { name: 'Groq API', level: 75, category: 'ai' },
  { name: 'HuggingFace', level: 55, category: 'ai' },
  { name: 'PyTorch', level: 45, category: 'ai' },
];
