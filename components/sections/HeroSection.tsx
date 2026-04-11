'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { personal } from '@/content/personal';

// ─── Framer variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
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
  opacity: [0.18, 0.3, 0.18] as number[],
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
};

// ─── Animated cycling title ─────────────────────────────────────────────────

function AnimatedTitle() {
  const t = useTranslations('hero');
  const titles = t.raw('titles') as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, 2500);
    return () => clearInterval(id);
  }, [titles.length]);

  return (
    <div className="h-14 md:h-20 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${index}-${titles[index]}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="font-display font-bold text-3xl md:text-5xl gradient-text block text-center"
          style={{ fontFamily: 'var(--font-syne)' }}
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
    const showTimer = setTimeout(() => setVisible(true), 2000);
    const onScroll = () => setFaded(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(showTimer);
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
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

// ─── Grid overlay ───────────────────────────────────────────────────────────

function GridOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(36,83,211,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(36,83,211,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const stats = [
    { value: t('stats.repos.value'), label: t('stats.repos.label') },
    { value: t('stats.experience.value'), label: t('stats.experience.label') },
    { value: t('stats.projects.value'), label: t('stats.projects.label') },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#060B18' }}
    >
      {/* ── Gradient orbs ── */}
      <motion.div
        aria-hidden
        animate={ORB_FLOAT_1}
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(36,83,211,0.22) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        aria-hidden
        animate={ORB_FLOAT_2}
        className="absolute -top-20 -right-40 w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        aria-hidden
        animate={ORB_PULSE}
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(36,83,211,0.14) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* ── Grid ── */}
      <GridOverlay />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col items-center text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Available badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border border-[rgba(36,83,211,0.35)] bg-[rgba(36,83,211,0.08)] text-[#E2E8F0] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {t('available')}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black tracking-tight text-5xl md:text-7xl lg:text-8xl text-white leading-none"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {personal.firstName}
            <br />
            <span className="text-4xl md:text-6xl lg:text-7xl">{personal.lastName.toUpperCase()}</span>
          </motion.h1>

          {/* Animated cycling title */}
          <motion.div variants={itemVariants} className="w-full">
            <AnimatedTitle />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: '#64748B', fontFamily: 'var(--font-dm-sans)' }}
          >
            {t('tagline')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          >
            <button
              onClick={() => scrollTo('contact')}
              className="relative inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 shadow-lg shadow-[rgba(36,83,211,0.3)]"
              style={{
                background: 'linear-gradient(135deg, #2453D3, #00D4FF)',
              }}
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
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                color: '#E2E8F0',
                border: '1px solid rgba(36,83,211,0.5)',
                background: 'rgba(36,83,211,0.08)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.6)';
                e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(36,83,211,0.5)';
                e.currentTarget.style.background = 'rgba(36,83,211,0.08)';
              }}
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
            className="flex items-center gap-0 mt-6 rounded-2xl overflow-hidden border border-[rgba(36,83,211,0.2)] bg-[rgba(13,21,38,0.6)] backdrop-blur-md divide-x divide-[rgba(36,83,211,0.2)]"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center px-8 py-4">
                <span
                  className="font-display font-bold text-2xl md:text-3xl gradient-text"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {value}
                </span>
                <span
                  className="text-xs mt-0.5 whitespace-nowrap"
                  style={{ color: '#64748B', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
