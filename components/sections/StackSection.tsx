'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { skills, tools, type SkillCategory } from '@/content/skills';

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = 'all' | SkillCategory;

const TABS: Tab[] = ['all', 'backend', 'frontend', 'devops', 'database', 'mobile', 'ai'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function barColor(level: number): string {
  if (level >= 80) return '#10B981';
  if (level >= 60) return '#2453D3';
  return '#00D4FF';
}

const CATEGORY_STYLE: Record<SkillCategory, { bg: string; text: string; border: string; icon: string }> = {
  backend:  { bg: 'rgba(36,83,211,0.14)',   text: '#2453D3', border: 'rgba(36,83,211,0.35)',   icon: '⚙️' },
  frontend: { bg: 'rgba(0,212,255,0.12)',   text: '#00D4FF', border: 'rgba(0,212,255,0.35)',   icon: '🎨' },
  devops:   { bg: 'rgba(245,158,11,0.12)',  text: '#F59E0B', border: 'rgba(245,158,11,0.35)',  icon: '🚀' },
  database: { bg: 'rgba(16,185,129,0.12)',  text: '#10B981', border: 'rgba(16,185,129,0.35)',  icon: '🗄️' },
  mobile:   { bg: 'rgba(139,92,246,0.12)', text: '#8B5CF6', border: 'rgba(139,92,246,0.35)', icon: '📱' },
  ai:       { bg: 'rgba(236,72,153,0.12)', text: '#EC4899', border: 'rgba(236,72,153,0.35)', icon: '🤖' },
};

// ─── Framer variants ──────────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.045 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// ─── Animated counter hook ────────────────────────────────────────────────────

function useCounter(target: number, active: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    setValue(0);
    const duration = 900;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active, target]);

  return value;
}

// ─── Skill card ───────────────────────────────────────────────────────────────

interface SkillCardProps {
  name: string;
  level: number;
  category: SkillCategory;
  index: number;
  levelLabel: string;
}

function SkillCard({ name, level, category, index, levelLabel }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const displayed = useCounter(level, isInView);
  const color = barColor(level);
  const style = CATEGORY_STYLE[category];

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="stack-card card-glow rounded-xl p-4 flex flex-col gap-3"
    >
      {/* Icon + name */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
          style={{ background: style.bg, border: `1px solid ${style.border}` }}
          aria-hidden
        >
          {style.icon}
        </div>
        <p className="font-mono text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {name}
        </p>
      </div>

      {/* Category badge */}
      <span
        className="self-start text-[10px] font-mono font-medium px-2 py-0.5 rounded-full"
        style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
      >
        {category}
      </span>

      {/* Progress bar + counter */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">{levelLabel}</span>
          <span
            className="font-mono text-xs font-bold tabular-nums"
            style={{ color }}
          >
            {displayed}%
          </span>
        </div>
        <div className="stack-bar-track h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: '0%' }}
            animate={{ width: isInView ? `${level}%` : '0%' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.05 + index * 0.03 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Category tab button ──────────────────────────────────────────────────────

interface TabButtonProps {
  tab: Tab;
  active: boolean;
  label: string;
  onClick: () => void;
}

function TabButton({ tab, active, label, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`stack-tab relative whitespace-nowrap px-4 py-2 text-sm font-medium font-mono rounded-lg transition-colors duration-200 ${
        active ? 'stack-tab-active' : 'stack-tab-inactive'
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="stack-tab-indicator"
          className="stack-tab-indicator absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StackSection() {
  const t = useTranslations('stack');
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered =
    activeTab === 'all' ? skills : skills.filter((s) => s.category === activeTab);

  return (
    <section
      id="stack"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="stack-bg-orb absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center gap-4 mb-12"
        >
          <p className="text-xs font-mono font-semibold tracking-widest text-muted uppercase">
            {t('label')}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t('title')}
          </h2>
          <p className="font-sans text-base text-muted max-w-xl leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <div className="mb-8 -mx-4 px-4 overflow-x-auto stack-tabs-scroll">
          <div className="flex items-center gap-1 w-max mx-auto">
            {TABS.map((tab) => (
              <TabButton
                key={tab}
                tab={tab}
                active={activeTab === tab}
                label={t(`tabs.${tab}`)}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        </div>

        {/* ── Skills grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((skill, i) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                level={skill.level}
                category={skill.category}
                index={i}
                levelLabel={t('levelLabel')}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Tools & Others ── */}
        <div className="mt-16">
          <p className="text-xs font-mono font-semibold tracking-widest text-muted uppercase text-center mb-6">
            {t('tools.title')}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tools.map((tool) => (
              <span key={tool} className="stack-tool-pill font-mono text-xs px-3 py-1.5 rounded-full">
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
