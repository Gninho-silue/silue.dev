'use client';

import { useRef } from 'react';
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
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.12 },
  }),
};

const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const certVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.38, ease: 'easeOut', delay: 0.25 + i * 0.07 },
  }),
};

// ─── Timeline Entry ───────────────────────────────────────────────────────────

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
      className="relative pl-10 pb-10 last:pb-0"
    >
      {/* Connector dot */}
      <div
        className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-brand-primary ${
          exp.current ? 'bg-brand-primary' : 'bg-background'
        }`}
      >
        {exp.current && (
          <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-40" />
        )}
      </div>

      {/* Date range */}
      <p className="font-mono text-xs text-muted mb-2 capitalize">
        {startLabel} — {endLabel}
      </p>

      {/* Company + location + status badges */}
      <div className="flex flex-wrap items-center gap-2 mb-1.5">
        <h3 className="font-display font-bold text-lg text-foreground leading-tight">
          {exp.company}
        </h3>
        <span className="exp-location-pill font-mono text-[10px] px-2 py-0.5 rounded-full">
          {exp.location}
        </span>
        {exp.remote && (
          <span className="exp-remote-badge font-mono text-[10px] px-2 py-0.5 rounded-full">
            {t('remote')}
          </span>
        )}
        {exp.current && (
          <span className="exp-current-badge inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('current')}
          </span>
        )}
      </div>

      {/* Role */}
      <p className="gradient-text font-display font-semibold text-base mb-2.5">
        {t(`${tKey}.role` as Parameters<typeof t>[0])}
      </p>

      {/* Description */}
      <p className="font-sans text-sm text-muted leading-relaxed mb-3">
        {t(`${tKey}.description` as Parameters<typeof t>[0])}
      </p>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-1.5">
        {exp.stack.map((tech) => (
          <span
            key={tech}
            className="exp-tech-badge font-mono text-[11px] px-2 py-0.5 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Education Card ───────────────────────────────────────────────────────────

interface EducationCardProps {
  icon: string;
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
      className="exp-edu-card card-glow rounded-xl p-5"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="exp-edu-icon flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-display font-bold text-base text-foreground">{name}</h4>
            <span className="exp-years-badge font-mono text-[10px] px-2 py-0.5 rounded-full">
              {years}
            </span>
          </div>
          <p className="gradient-text font-semibold text-sm mt-0.5">{degree}</p>
        </div>
      </div>
      <p className="font-sans text-sm text-muted leading-relaxed">{field}</p>
      {note && (
        <p className="font-mono text-[11px] text-muted mt-2 opacity-75">{note}</p>
      )}
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

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
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background orb */}
      <div
        aria-hidden
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full pointer-events-none exp-bg-orb"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center gap-4 mb-16"
        >
          <p className="text-xs font-mono font-semibold tracking-widest text-muted uppercase">
            {t('label')}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t('sectionTitle')}
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: Work timeline ── */}
          <div ref={timelineRef}>
            {/* Relative container for the vertical line + entries */}
            <div className="relative">
              {/* Animated timeline line */}
              <motion.div
                className="exp-timeline-line absolute top-2 bottom-0 left-[4px] w-0.5 origin-top"
                initial={{ scaleY: 0 }}
                animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />

              {/* Experience entries */}
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
                className="font-display font-bold text-xl text-foreground mb-5"
              >
                {t('education.title')}
              </motion.h3>
              <div className="flex flex-col gap-4">
                <EducationCard
                  icon="🎓"
                  name={t('education.ensa.name')}
                  degree={t('education.ensa.degree')}
                  field={t('education.ensa.field')}
                  note={t('education.ensa.graduation')}
                  years={t('education.ensa.years')}
                  index={0}
                />
                <EducationCard
                  icon="📐"
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
                className="font-display font-bold text-xl text-foreground mb-4"
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
                    className="exp-cert-pill font-mono text-xs px-3 py-1.5 rounded-full"
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
