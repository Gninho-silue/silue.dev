'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { personal } from '@/content/personal';

// ─── Framer variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 },
  },
};

const ORB_FLOAT_1 = {
  y: [0, -28, 0] as number[],
  x: [0, 14, 0] as number[],
  transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' as const },
};

const ORB_FLOAT_2 = {
  y: [0, 22, 0] as number[],
  x: [0, -18, 0] as number[],
  transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' as const },
};

const ORB_PULSE = {
  scale: [1, 1.15, 1] as number[],
  opacity: [0.12, 0.22, 0.12] as number[],
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
};

// ─── Animated cycling title ─────────────────────────────────────────────────

function AnimatedTitle() {
  const t = useTranslations('hero');
  const titles = t.raw('titles') as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % titles.length), 2500);
    return () => clearInterval(id);
  }, [titles.length]);

  return (
    <div className="h-10 md:h-14 flex items-center overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${index}-${titles[index]}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.38, ease: 'easeInOut' }}
          className="font-display font-bold text-2xl md:text-4xl gradient-text block"
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Scroll indicator ───────────────────────────────────────────────────────

function ScrollIndicator() {
  const [visible, setVisible] = useState(false);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    const onScroll = () => setFaded(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !faded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-muted"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Profile photo ──────────────────────────────────────────────────────────

function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0">
      {/* Rotating gradient ring — uses CSS class from globals.css */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="hero-photo-ring absolute -inset-1.5"
        aria-hidden
      />

      {/* Inner container */}
      <div className="hero-photo-inner relative w-full h-full rounded-full overflow-hidden border-4">
        {!imgError ? (
          <Image
            src="/profile.png"
            alt={`Photo de ${personal.name}`}
            fill
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
            className="object-cover object-center"
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="font-display font-black text-5xl md:text-6xl gradient-text">
              GS
            </span>
            <span className="hero-photo-initials-sub text-xs font-mono tracking-widest">
              {personal.firstName.slice(0, 6).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Availability badge on photo */}
      <div className="hero-photo-badge absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        {personal.availableFrom}
      </div>

      {/* Glow behind photo */}
      <div
        className="absolute inset-0 rounded-full -z-10 blur-2xl opacity-30"
        aria-hidden
        style={{
          background: 'radial-gradient(circle, #2453D3 0%, #00D4FF 60%, transparent 80%)',
        }}
      />
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const stats = [
    { value: t('stats.repos.value'), label: t('stats.repos.label') },
    { value: t('stats.experience.value'), label: t('stats.experience.label') },
    { value: t('stats.projects.value'), label: t('stats.projects.label') },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* ── Gradient orbs (colors handled by CSS classes) ── */}
      <motion.div
        aria-hidden
        animate={ORB_FLOAT_1}
        className="hero-orb-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
      />
      <motion.div
        aria-hidden
        animate={ORB_FLOAT_2}
        className="hero-orb-2 absolute -top-20 -right-40 w-[440px] h-[440px] rounded-full pointer-events-none"
      />
      <motion.div
        aria-hidden
        animate={ORB_PULSE}
        className="hero-orb-3 absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full pointer-events-none"
      />

      {/* ── Grid overlay ── */}
      <div
        aria-hidden
        className="hero-grid absolute inset-0 pointer-events-none"
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* ── Left: Text content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-5 lg:max-w-xl xl:max-w-2xl w-full"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants}>
              <span className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {t('available')}
              </span>
            </motion.div>

            {/* Name — fluid sizing via CSS class, never overflows */}
            <motion.h1 variants={itemVariants}>
              <span className="hero-name-first block">{personal.firstName}</span>
              <span className="hero-name-last block">{personal.lastName.toUpperCase()}</span>
            </motion.h1>

            {/* Animated cycling title */}
            <motion.div variants={itemVariants} className="w-full">
              <AnimatedTitle />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="hero-tagline text-base md:text-lg leading-relaxed max-w-lg"
            >
              {t('tagline')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-3 mt-1"
            >
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="hero-cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {t('cta.contact')}
              </button>

              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="hero-cta-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                {t('cta.projects')}
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="hero-stats flex items-stretch rounded-2xl overflow-hidden mt-2"
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center px-6 py-4 ${i < stats.length - 1 ? 'hero-stat-divider' : ''}`}
                >
                  <span className="font-display font-bold text-xl md:text-2xl gradient-text">
                    {value}
                  </span>
                  <span className="font-sans text-xs text-muted mt-0.5 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile photo ── */}
          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0 flex items-center justify-center"
          >
            <ProfilePhoto />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
