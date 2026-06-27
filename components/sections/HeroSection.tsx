'use client';

import { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { personal, social } from '@/content/personal';

// ─── Framer variants ─────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const terminalVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.3 } },
};

// ─── Terminal block ───────────────────────────────────────────────────────────

function TerminalBlock() {
  return (
    <div className="terminal-block w-full max-w-sm p-5 text-sm leading-relaxed">
      {/* Window bar */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[var(--text-secondary)] text-xs">gninho@casablanca</span>
      </div>

      {/* Lines */}
      <div className="flex flex-col gap-1.5">
        <div>
          <span className="terminal-prompt">$ </span>
          <span className="text-[var(--text-primary)]">whoami</span>
        </div>
        <div className="pl-2 text-[var(--text-secondary)]">
          <span className="terminal-prompt">&gt; </span>Full-Stack Engineer
        </div>

        <div className="mt-1">
          <span className="terminal-prompt">$ </span>
          <span className="text-[var(--text-primary)]">cat stack.txt</span>
        </div>
        <div className="pl-2 text-[var(--text-secondary)]">
          <span className="terminal-prompt">&gt; </span>Java · Spring · React · Next.js
        </div>
        <div className="pl-2 text-[var(--text-secondary)]">
          <span className="terminal-prompt">&gt; </span>Docker · K8s · Groq · Kafka
        </div>

        <div className="mt-1">
          <span className="terminal-prompt">$ </span>
          <span className="text-[var(--text-primary)]">git status</span>
        </div>
        <div className="pl-2 text-emerald-400">
          <span className="terminal-prompt">&gt; </span>Available from July 2026
        </div>
      </div>
    </div>
  );
}

// ─── Social icon buttons ──────────────────────────────────────────────────────

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border)] rounded-lg transition-all duration-200"
    >
      {children}
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const stats = [
    { value: t('stats.repos.value'), label: t('stats.repos.label') },
    { value: t('stats.experience.value'), label: t('stats.experience.label') },
    { value: t('stats.projects.value'), label: t('stats.projects.label') },
    { value: personal.availableFrom, label: 'Available' },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg)]"
    >
      {/* Dot grid background */}
      <div aria-hidden className="dot-grid absolute inset-0 pointer-events-none opacity-60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        {/* ── Mobile layout ── */}
        <div className="flex flex-col gap-8 md:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {t('available')}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={itemVariants} className="font-mono font-black leading-[1.02]">
              <span className="block" style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}>
                {personal.firstName}
              </span>
              <span className="block" style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}>
                {personal.lastName.toUpperCase()}.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="font-mono text-sm text-[var(--text-secondary)]">
              Full-Stack Engineer // Backend · Cloud · AI
            </motion.p>

            {/* Description */}
            <motion.p variants={itemVariants} className="font-mono text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              {t('tagline')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2 w-full max-w-xs">
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-mono"
              >
                {t('cta.contact')}
              </button>
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-mono"
              >
                {t('cta.projects')}
              </button>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={itemVariants} className="flex items-center gap-1">
              <SocialIcon href={social.github} label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={social.linkedin} label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={`mailto:${personal.email}`} label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </SocialIcon>
            </motion.div>
          </motion.div>

          {/* Terminal — mobile */}
          <motion.div variants={terminalVariants} initial="hidden" animate="visible">
            <TerminalBlock />
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-x-4 gap-y-1"
          >
            {stats.map(({ value, label }, i) => (
              <span key={label} className="font-mono text-xs text-[var(--text-secondary)]">
                <span className="text-[var(--text-primary)] font-semibold">{value}</span>
                {' '}{label}
                {i < stats.length - 1 && <span className="ml-4 text-[var(--text-muted)]">·</span>}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Desktop layout ── */}
        <div className="hidden md:flex flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left: text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:max-w-xl xl:max-w-2xl w-full"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {t('available')}
              </span>
            </motion.div>

            {/* Name — huge */}
            <motion.h1 variants={itemVariants} className="font-mono font-black leading-[1.02]">
              <span
                className="block text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                {personal.firstName}
              </span>
              <span
                className="block text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                {personal.lastName.toUpperCase()}.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="font-mono text-lg text-[var(--text-secondary)]">
              Full-Stack Engineer // Backend · Cloud · AI
            </motion.p>

            {/* Description */}
            <motion.p variants={itemVariants} className="font-mono text-base text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {t('tagline')}
            </motion.p>

            {/* CTA row */}
            <motion.div variants={itemVariants} className="flex flex-row flex-wrap items-center gap-3 mt-1">
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono"
              >
                {t('cta.contact')}
              </button>
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono"
              >
                {t('cta.projects')}
              </button>
              <a
                href="https://jobpilot-jet.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-mono"
              >
                jobpilot ↗
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={itemVariants} className="flex items-center gap-1">
              <SocialIcon href={social.github} label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={social.linkedin} label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={`mailto:${personal.email}`} label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </SocialIcon>
            </motion.div>

            {/* Stats bar */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mt-2">
              {stats.map(({ value, label }, i) => (
                <span key={label} className="font-mono text-xs text-[var(--text-secondary)] flex items-center gap-4">
                  <span>
                    <span className="text-[var(--text-primary)] font-semibold">{value}</span>
                    {' '}{label}
                  </span>
                  {i < stats.length - 1 && <span className="text-[var(--text-muted)]">·</span>}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: terminal */}
          <motion.div
            variants={terminalVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0"
          >
            <TerminalBlock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
