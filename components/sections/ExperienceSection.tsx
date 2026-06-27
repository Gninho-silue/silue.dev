'use client';

import { useRef, type ReactNode } from 'react';
import { GraduationCap, Calculator } from 'lucide-react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { experiences, type Experience } from '@/content/experience';
import { useLocaleContext } from '@/components/providers/Providers';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1);
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function idToKey(id: string): string {
  return id.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
}

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const slideRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const certVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut', delay: 0.2 + i * 0.06 },
  }),
};

// ─── Timeline entry ───────────────────────────────────────────────────────────

function TimelineEntry({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const t = useTranslations('experience');
  const { locale } = useLocaleContext();

  const startLabel = formatDate(exp.startDate, locale);
  const endLabel = exp.current
    ? t('present')
    : exp.endDate
    ? formatDate(exp.endDate, locale)
    : '';

  const tKey = idToKey(exp.id) as Parameters<typeof t>[0];

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={slideLeft}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-1.5 w-2 h-2 rounded-full border ${
          exp.current
            ? 'bg-[#F59E0B] border-[#F59E0B]'
            : 'bg-[var(--bg)] border-[var(--text-secondary)]'
        }`}
      />

      {/* Date */}
      <p className="font-mono text-xs text-[var(--text-secondary)] mb-2 capitalize">
        {startLabel} — {endLabel}
      </p>

      {/* Company + badges */}
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <h3 className="font-mono font-bold text-lg text-[var(--text-primary)] leading-tight">
          {exp.company}
        </h3>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-secondary)]">
          {exp.location}
        </span>
        {exp.remote && (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-secondary)]">
            {t('remote')}
          </span>
        )}
        {exp.current && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('current')}
          </span>
        )}
      </div>

      {/* Role */}
      <p className="font-mono font-semibold text-sm text-[var(--accent)] mb-2">
        {t(`${tKey}.role` as Parameters<typeof t>[0])}
      </p>

      {/* Description */}
      <p className="font-mono text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
        {t(`${tKey}.description` as Parameters<typeof t>[0])}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {exp.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-secondary)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Education card ───────────────────────────────────────────────────────────

interface EducationCardProps {
  icon: ReactNode;
  name: string;
  degree: string;
  field: string;
  note: string;
  years: string;
  index: number;
}

function EducationCard({ icon, name, degree, field, note, years, index }: EducationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={slideRight}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="flat-card p-5"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-[var(--bg-hover)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-mono font-bold text-sm text-[var(--text-primary)]">{name}</h4>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-secondary)]">
              {years}
            </span>
          </div>
          <p className="font-mono text-xs text-[var(--accent)] font-semibold mt-0.5">{degree}</p>
        </div>
      </div>
      <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed">{field}</p>
      {note && (
        <p className="font-mono text-[11px] text-[var(--text-muted)] mt-2">{note}</p>
      )}
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  const t = useTranslations('experience');
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-80px' });
  const certsRef = useRef<HTMLDivElement>(null);
  const isCertsInView = useInView(certsRef, { once: true, margin: '-40px' });
  const eduRef = useRef<HTMLDivElement>(null);
  const isEduInView = useInView(eduRef, { once: true, margin: '-60px' });

  const CERTIFICATIONS = [
    t('certifications.oci'),
    t('certifications.java'),
    t('certifications.microservices'),
    t('certifications.devops'),
    t('certifications.python'),
  ];

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 bg-[var(--bg)]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-3 mb-16"
        >
          <p className="section-label">{'// '}{t('label')}</p>
          <h2 className="font-mono font-black text-3xl md:text-4xl text-[var(--text-primary)]">
            {t('sectionTitle')}
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: Timeline ── */}
          <div ref={timelineRef}>
            <div className="relative">
              {/* Thin timeline line — 1px */}
              <motion.div
                className="timeline-line absolute top-2 bottom-0 left-[3px] w-px origin-top"
                initial={{ scaleY: 0 }}
                animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />

              {experiences.map((exp, i) => (
                <TimelineEntry key={exp.id} exp={exp} index={i} />
              ))}
            </div>
          </div>

          {/* ── Right: Education + Certifications ── */}
          <div className="flex flex-col gap-8">

            {/* Education */}
            <div ref={eduRef}>
              <motion.h3
                variants={fadeUp}
                initial="hidden"
                animate={isEduInView ? 'visible' : 'hidden'}
                className="font-mono font-bold text-base text-[var(--text-primary)] mb-5"
              >
                {t('education.title')}
              </motion.h3>
              <div className="flex flex-col gap-4">
                <EducationCard
                  icon={<GraduationCap size={18} />}
                  name={t('education.ensa.name')}
                  degree={t('education.ensa.degree')}
                  field={t('education.ensa.field')}
                  note={t('education.ensa.graduation')}
                  years={t('education.ensa.years')}
                  index={0}
                />
                <EducationCard
                  icon={<Calculator size={18} />}
                  name={t('education.estem.name')}
                  degree={t('education.estem.degree')}
                  field={t('education.estem.field')}
                  note={t('education.estem.note')}
                  years={t('education.estem.years')}
                  index={1}
                />
              </div>
            </div>

            {/* Certifications */}
            <div ref={certsRef}>
              <motion.h3
                variants={fadeUp}
                initial="hidden"
                animate={isCertsInView ? 'visible' : 'hidden'}
                className="font-mono font-bold text-base text-[var(--text-primary)] mb-4"
              >
                {t('certifications.title')}
              </motion.h3>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert, i) => (
                  <motion.span
                    key={cert}
                    custom={i}
                    variants={certVariants}
                    initial="hidden"
                    animate={isCertsInView ? 'visible' : 'hidden'}
                    className="flat-badge cursor-default"
                  >
                    {cert}
                  </motion.span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
