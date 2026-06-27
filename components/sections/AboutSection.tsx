'use client';

import { useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, GraduationCap, Award, Globe, MessageSquare, Zap, Layers, Eye } from 'lucide-react';
import { social } from '@/content/personal';
import CVDownloadDropdown from '@/components/ui/CVDownloadDropdown';

// ─── Framer variants ────────────────────────────────────────────────────────

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.1 } },
};

const pillContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const pillVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ─── Info row ───────────────────────────────────────────────────────────────

function InfoRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="shrink-0 mt-0.5 text-[var(--text-secondary)]">{icon}</span>
      <span className="font-mono text-[var(--text-secondary)] leading-snug">{text}</span>
    </div>
  );
}

// ─── Philosophy pill ────────────────────────────────────────────────────────

function Pill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.span
      variants={pillVariant}
      className="flat-badge inline-flex items-center gap-1.5"
    >
      <span className="text-[var(--accent)]">{icon}</span>
      {label}
    </motion.span>
  );
}

// ─── Profile photo ──────────────────────────────────────────────────────────

function ProfilePhoto() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-12 h-12 rounded-xl bg-[var(--bg-hover)] border border-[var(--border)] flex items-center justify-center shrink-0">
        <span className="font-mono font-black text-sm text-[var(--accent)]">GS</span>
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[var(--border)] shrink-0">
      <Image
        src="/profile.png"
        alt="Gninninmaguignon Silué"
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function AboutSection() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const pills = [
    { icon: <Zap size={13} />, label: t('pills.performance') },
    { icon: <Layers size={13} />, label: t('pills.architecture') },
    { icon: <Eye size={13} />, label: t('pills.observability') },
  ];

  const infoRows = [
    { icon: <MapPin size={14} />, text: t('card.location') },
    { icon: <GraduationCap size={14} />, text: t('card.school') },
    { icon: <Award size={14} />, text: t('card.diploma') },
    { icon: <Globe size={14} />, text: t('card.openTo') },
    { icon: <MessageSquare size={14} />, text: t('card.languages') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[var(--bg)]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.p
          className="section-label mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {'// '}{t('label')}
        </motion.p>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-24">

          {/* ── Left: text ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex-1 flex flex-col gap-6 min-w-0"
          >
            {/* Title */}
            <h2 className="font-mono font-black text-3xl md:text-4xl text-[var(--text-primary)] leading-tight">
              {t('title')}
              <span className="text-[var(--accent)]"> {t('titleHighlight')}</span>
            </h2>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4">
              <p className="font-mono text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
                {t('bio1')}
              </p>
              <p className="font-mono text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
                {t('bio2')}
              </p>
            </div>

            {/* Philosophy pills */}
            <motion.div
              variants={pillContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-2 mt-1"
            >
              {pills.map(({ icon, label }) => (
                <Pill key={label} icon={icon} label={label} />
              ))}
            </motion.div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-2">
              <CVDownloadDropdown variant="about" align="left" />

              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                {t('cta.github')}
              </a>
            </div>
          </motion.div>

          {/* ── Right: info card ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-full lg:w-80 xl:w-96 shrink-0"
          >
            <div className="flat-card p-6 flex flex-col gap-5">

              {/* Name + title */}
              <div className="flex items-center gap-4">
                <ProfilePhoto />
                <div className="min-w-0">
                  <p className="font-mono font-bold text-sm text-[var(--text-primary)] truncate">
                    {t('card.name')}
                  </p>
                  <p className="font-mono text-xs text-[var(--text-secondary)] mt-0.5">
                    {t('card.title')}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[var(--border)]" />

              {/* Info rows */}
              <div className="flex flex-col gap-3">
                {infoRows.map(({ icon, text }) => (
                  <InfoRow key={text} icon={icon} text={text} />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[var(--border)]" />

              {/* Availability */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-xs font-medium text-emerald-400">
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
