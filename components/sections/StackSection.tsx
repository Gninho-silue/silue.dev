'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { skills, type SkillCategory } from '@/content/skills';
import { personal } from '@/content/personal';

// ─── Secondary category groups ─────────────────────────────────────────────────

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', 'devops', 'ai', 'tools'];

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

// ─── Terminal block (decorative, moved from Hero) ──────────────────────────────

function TerminalBlock() {
  const t = useTranslations('stack');
  return (
    <div className="terminal-block w-full max-w-xs p-4 text-xs leading-relaxed">
      {/* Window bar */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-red-500/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <span className="w-2 h-2 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[var(--text-secondary)] text-[11px]">gninho@casablanca</span>
      </div>

      {/* Lines */}
      <div className="flex flex-col gap-1.5">
        <div>
          <span className="terminal-prompt">$ </span>
          <span className="text-[var(--text-primary)]">whoami</span>
        </div>
        <div className="pl-2 text-[var(--text-secondary)]">
          <span className="terminal-prompt">&gt; </span>{personal.title}
        </div>

        <div className="mt-1">
          <span className="terminal-prompt">$ </span>
          <span className="text-[var(--text-primary)]">cat stack.txt</span>
        </div>
        <div className="pl-2 text-[var(--text-secondary)]">
          <span className="terminal-prompt">&gt; </span>Java · Spring · React · Next.js
        </div>
        <div className="pl-2 text-[var(--text-secondary)]">
          <span className="terminal-prompt">&gt; </span>Docker · Kafka · PostgreSQL · LangGraph
        </div>

        <div className="mt-1">
          <span className="terminal-prompt">$ </span>
          <span className="text-[var(--text-primary)]">git status</span>
        </div>
        <div className="pl-2 text-[var(--success)]">
          <span className="terminal-prompt">&gt; </span>{t('terminal.status')}
        </div>
      </div>
    </div>
  );
}

// ─── Core (Level 1) badge ───────────────────────────────────────────────────────

function CoreBadge({ name, index, inView }: { name: string; index: number; inView: boolean }) {
  return (
    <motion.span
      custom={index}
      variants={badgeVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="font-mono text-sm font-semibold px-4 py-2 rounded-lg border border-[var(--accent)]/40 bg-[var(--accent-soft)] text-[var(--accent)] cursor-default"
    >
      {name}
    </motion.span>
  );
}

// ─── Secondary (Level 2) group ──────────────────────────────────────────────────

function SecondaryGroup({
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
      <p className="font-mono text-[11px] font-semibold tracking-widest text-[var(--text-secondary)] uppercase">
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
            className="tag text-[13px] px-2.5 py-1 cursor-default"
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
  const terminalRef = useRef<HTMLDivElement>(null);
  const isTerminalInView = useInView(terminalRef, { once: true, margin: '-40px' });
  const bodyRef = useRef<HTMLDivElement>(null);
  const isBodyInView = useInView(bodyRef, { once: true, margin: '-60px' });

  const coreSkills = skills.filter((s) => s.core);
  const secondarySkills = skills.filter((s) => !s.core);

  return (
    <section
      id="stack"
      className="relative py-16 md:py-24 bg-[var(--bg)]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-3 mb-12"
        >
          <p className="section-label">{'// '}{t('label')}</p>
          <h2 className="font-semibold text-3xl md:text-4xl text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-[65ch] leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: skills ── */}
          <div ref={bodyRef} className="flex flex-col gap-10">

            {/* Level 1 — Core expertise */}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[11px] font-semibold tracking-widest text-[var(--text-secondary)] uppercase">
                {t('coreExpertise')}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {coreSkills.map((s, i) => (
                  <CoreBadge key={s.name} name={s.name} index={i} inView={isBodyInView} />
                ))}
              </div>
            </div>

            {/* Level 2 — Also work with */}
            <div className="flex flex-col gap-6">
              <p className="font-mono text-[11px] font-semibold tracking-widest text-[var(--text-secondary)] uppercase">
                {t('alsoWorkWith')}
              </p>
              <div className="flex flex-col gap-6">
                {CATEGORY_ORDER.map((cat) => {
                  const names = secondarySkills.filter((s) => s.category === cat).map((s) => s.name);
                  const offset = coreSkills.length + CATEGORY_ORDER
                    .slice(0, CATEGORY_ORDER.indexOf(cat))
                    .reduce((acc, c) => acc + secondarySkills.filter((s) => s.category === c).length, 0);

                  return (
                    <SecondaryGroup
                      key={cat}
                      label={t(`categories.${cat}`)}
                      names={names}
                      inView={isBodyInView}
                      globalOffset={offset}
                    />
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── Right: terminal (decorative) ── */}
          <motion.div
            ref={terminalRef}
            variants={fadeUp}
            initial="hidden"
            animate={isTerminalInView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-end"
          >
            <TerminalBlock />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
