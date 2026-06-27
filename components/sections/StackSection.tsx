'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { skills, type SkillCategory } from '@/content/skills';

// ─── Category groups ──────────────────────────────────────────────────────────

const GROUPS: { id: SkillCategory | 'all'; labelKey: string }[] = [
  { id: 'backend',  labelKey: 'CORE' },
  { id: 'frontend', labelKey: 'FRONTEND' },
  { id: 'devops',   labelKey: 'CLOUD & DEVOPS' },
  { id: 'database', labelKey: 'DATABASES' },
  { id: 'mobile',   labelKey: 'MOBILE' },
  { id: 'ai',       labelKey: 'AI / ML' },
];

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const badgeVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: 'easeOut', delay: i * 0.03 },
  }),
};

// ─── Badge group ─────────────────────────────────────────────────────────────

function BadgeGroup({
  label,
  names,
  inView,
  globalOffset,
}: {
  label: string;
  names: string[];
  inView: boolean;
  globalOffset: number;
}) {
  if (names.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[10px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {names.map((name, i) => (
          <motion.span
            key={name}
            custom={globalOffset + i}
            variants={badgeVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flat-badge cursor-default"
          >
            {name}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StackSection() {
  const t = useTranslations('stack');
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });
  const bodyRef = useRef<HTMLDivElement>(null);
  const isBodyInView = useInView(bodyRef, { once: true, margin: '-60px' });

  return (
    <section
      id="stack"
      className="relative py-24 md:py-32 bg-[var(--bg)]"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-3 mb-14"
        >
          <p className="section-label">{'// '}{t('label')}</p>
          <h2 className="font-mono font-black text-3xl md:text-4xl text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="font-mono text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Badge grid ── */}
        <div ref={bodyRef} className="flex flex-col gap-10">
          {GROUPS.map(({ id, labelKey }) => {
            const names = skills
              .filter((s) => s.category === id)
              .map((s) => s.name);

            const offset = GROUPS
              .slice(0, GROUPS.findIndex((g) => g.id === id))
              .reduce((acc, g) => acc + skills.filter((s) => s.category === g.id).length, 0);

            return (
              <BadgeGroup
                key={id}
                label={labelKey}
                names={names}
                inView={isBodyInView}
                globalOffset={offset}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
