'use client';

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { personal, social } from '@/content/personal';
import SectionTitle from '@/components/ui/SectionTitle';
import CVDownloadDropdown from '@/components/ui/CVDownloadDropdown';

// ─── Framer variants ────────────────────────────────────────────────────────

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.1 },
  },
};

const pillContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Gradient underline title ───────────────────────────────────────────────

// ─── Info row ───────────────────────────────────────────────────────────────

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="text-base leading-none mt-0.5 shrink-0">{icon}</span>
      <span className="text-foreground/80 leading-snug">{text}</span>
    </div>
  );
}

// ─── Philosophy pill ────────────────────────────────────────────────────────

function Pill({ emoji, label }: { emoji: string; label: string }) {
  return (
    <motion.span
      variants={pillVariants}
      className="about-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-mono"
    >
      <span>{emoji}</span>
      {label}
    </motion.span>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function AboutSection() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [imgError, setImgError] = useState(false);

  const pills = [
    { emoji: '⚡', label: t('pills.performance') },
    { emoji: '🏗️', label: t('pills.architecture') },
    { emoji: '🔍', label: t('pills.observability') },
  ];

  const infoRows = [
    { icon: '📍', text: t('card.location') },
    { icon: '🎓', text: t('card.school') },
    { icon: '📅', text: t('card.diploma') },
    { icon: '🌍', text: t('card.openTo') },
    { icon: '💬', text: t('card.languages') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="about-bg-orb absolute -top-40 -right-40 w-125 h-125 rounded-full pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-24">

          {/* ── Left: Text content ── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex-1 flex flex-col gap-6 min-w-0"
          >
            {/* Label */}
            <p className="text-xs font-mono font-semibold tracking-widest text-muted uppercase">
              {t('label')}
            </p>

            {/* Title with gradient highlight */}
            <SectionTitle full={t('title')} highlight={t('titleHighlight')} />

            {/* Description paragraphs */}
            <div className="flex flex-col gap-4">
              <p className="font-sans text-base md:text-lg leading-relaxed text-muted">
                {t('bio1')}
              </p>
              <p className="font-sans text-base md:text-lg leading-relaxed text-muted">
                {t('bio2')}
              </p>
            </div>

            {/* Philosophy pills */}
            <motion.div
              variants={pillContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-2 mt-1"
            >
              {pills.map(({ emoji, label }) => (
                <Pill key={label} emoji={emoji} label={label} />
              ))}
            </motion.div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-2">
              <CVDownloadDropdown variant="about" align="left" />

              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                {t('cta.github')}
              </a>
            </div>
          </motion.div>

          {/* ── Right: Info card ── */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-full lg:w-80 xl:w-96 shrink-0"
          >
            <div className="about-card card-glow rounded-2xl p-6 flex flex-col gap-5">

              {/* Photo + name + title */}
              <div className="flex items-center gap-4">
                <div className="about-card-photo relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2">
                  {!imgError ? (
                    <Image
                      src="/profile.png"
                      alt={`Photo de ${personal.name}`}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display font-black text-xl gradient-text">GS</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm text-foreground truncate">
                    {t('card.name')}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{t('card.title')}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="about-card-divider h-px w-full" />

              {/* Info rows */}
              <div className="flex flex-col gap-3">
                {infoRows.map(({ icon, text }) => (
                  <InfoRow key={icon} icon={icon} text={text} />
                ))}
              </div>

              {/* Divider */}
              <div className="about-card-divider h-px w-full" />

              {/* Availability */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  {t('card.available')}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
