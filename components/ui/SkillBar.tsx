'use client';

import { motion, type Variants } from 'framer-motion';

const rowVariants: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.07 },
  }),
};

interface SkillBarProps {
  name: string;
  /** 0–100 */
  level: number;
  /** Stagger index for entrance animation */
  index: number;
  /** Whether the parent section is in view */
  inView: boolean;
}

/** Animated horizontal progress bar for a single skill.
 *  Add a new skill to content/skills.ts with featured:true to show it here automatically.
 */
export default function SkillBar({ name, level, index, inView }: SkillBarProps) {
  const color = level >= 80 ? '#10B981' : '#2453D3';

  return (
    <motion.div
      custom={index}
      variants={rowVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="flex items-center gap-4"
    >
      <span
        className="font-mono text-sm font-semibold text-foreground shrink-0"
        style={{ minWidth: '130px' }}
      >
        {name}
      </span>

      <div className="stack-bar-track flex-1 h-1.5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: '0%' }}
          animate={{ width: inView ? `${level}%` : '0%' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 + index * 0.07 }}
        />
      </div>

      <span
        className="font-mono text-xs tabular-nums text-muted shrink-0"
        style={{ minWidth: '36px', textAlign: 'right' }}
      >
        {level}%
      </span>
    </motion.div>
  );
}
