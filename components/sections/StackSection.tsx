'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { skills, type SkillCategory } from '@/content/skills';
import SkillBar from '@/components/ui/SkillBar';

// ─── Constants ────────────────────────────────────────────────────────────────

type Tab = 'all' | SkillCategory;
const TABS: Tab[] = ['all', 'backend', 'frontend', 'devops', 'database', 'mobile', 'ai'];

// Category color palette
const CAT_COLOR: Record<SkillCategory, string> = {
  backend:  '#2453D3',
  frontend: '#00D4FF',
  devops:   '#F59E0B',
  database: '#10B981',
  mobile:   '#8B5CF6',
  ai:       '#EC4899',
};

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const tagVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: 'easeOut', delay: i * 0.04 },
  }),
};

// ─── Tab button ───────────────────────────────────────────────────────────────

function TabButton({ active, label, onClick }: {
  tab: Tab; active: boolean; label: string; onClick: () => void;
}) {
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

// ─── Tag cloud — auto-derived from non-featured skills ────────────────────────

function TagCloud({ activeTab, inView }: { activeTab: Tab; inView: boolean }) {
  const t = useTranslations('stack');

  // Non-featured skills, filtered by tab, become the tag cloud automatically
  const entries = skills
    .filter((s) => !s.featured && (activeTab === 'all' || s.category === activeTab))
    .map((s) => ({ tag: s.name, cat: s.category }));

  if (entries.length === 0) return null;

  return (
    <div>
      {/* Divider */}
      <div className="stack-divider flex items-center gap-4 my-10">
        <div className="flex-1 h-px stack-divider-line" />
        <span className="font-mono text-xs text-muted uppercase tracking-widest whitespace-nowrap">
          {t('alsoWorkWith')}
        </span>
        <div className="flex-1 h-px stack-divider-line" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {entries.map(({ tag, cat }, i) => {
          const color = CAT_COLOR[cat];
          return (
            <motion.span
              key={`${cat}-${tag}`}
              custom={i}
              variants={tagVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-mono text-[12px] px-3 py-1 rounded"
              style={{
                color,
                border: `1px solid ${color}99`,
                background: `${color}14`,
              }}
            >
              {tag}
            </motion.span>
          );
        })}
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

  const [activeTab, setActiveTab] = useState<Tab>('all');

  // featured:true skills shown as bars, filtered by active tab
  const coreSkills = skills.filter(
    (s) => s.featured && (activeTab === 'all' || s.category === activeTab),
  );

  // Tag cloud exists if there are non-featured skills for this tab
  const hasTags = skills.some(
    (s) => !s.featured && (activeTab === 'all' || s.category === activeTab),
  );

  return (
    <section
      id="stack"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div
        aria-hidden
        className="stack-bg-orb absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
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
        <div className="mb-10 -mx-4 px-4 overflow-x-auto stack-tabs-scroll">
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

        {/* ── Body — fades when tab changes ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            ref={bodyRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Core expertise bars */}
            {coreSkills.length > 0 && (
              <div>
                <p className="font-mono text-[11px] font-semibold tracking-widest text-muted uppercase mb-6">
                  {t('coreExpertise')}
                </p>
                <div className="flex flex-col gap-5">
                  {coreSkills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      index={i}
                      inView={isBodyInView}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tag cloud + divider */}
            {hasTags && (
              <TagCloud activeTab={activeTab} inView={isBodyInView} />
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
