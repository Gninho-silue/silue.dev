'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { projects, type Project } from '@/content/projects';
import { social } from '@/content/personal';

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Stack badges ─────────────────────────────────────────────────────────────

function StackBadges({ stack }: { stack: string[] }) {
  const t = useTranslations('projects');
  const shown = stack.slice(0, 5);
  const extra = stack.length - 5;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((tech) => (
        <span
          key={tech}
          className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-secondary)]"
        >
          {tech}
        </span>
      ))}
      {extra > 0 && (
        <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)]">
          {t('moreTech', { n: extra })}
        </span>
      )}
    </div>
  );
}

// ─── Project image ────────────────────────────────────────────────────────────

function ProjectImage({ image, alt, aspectVideo = false }: { image: string; alt: string; aspectVideo?: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden rounded-lg bg-[var(--bg-hover)] border border-[var(--border)] ${aspectVideo ? 'aspect-video' : 'h-44'}`}>
      {!imgError ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover object-top"
          onError={() => setImgError(true)}
          loading="lazy"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs text-[var(--text-muted)]">{alt}</span>
        </div>
      )}
    </div>
  );
}

// ─── Featured project card ────────────────────────────────────────────────────

function FeaturedCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const t = useTranslations('projects');

  const tKey = project.id
    .replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase()) as Parameters<typeof t>[0];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="flat-card p-6 md:p-8 mb-12"
    >
      {/* Featured badge */}
      <div className="flex items-center gap-2 mb-6">
        {project.icon && (
          <span className="text-base shrink-0">{project.icon}</span>
        )}
        <span className="btn-accent text-xs font-mono px-2.5 py-0.5 rounded">
          ★ {t('featured')}
        </span>
        {project.inProgress && (
          <span className="font-mono text-xs px-2 py-0.5 rounded border border-[#F59E0B]/40 text-[#F59E0B]">
            {t('inProgress')}
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left: info */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <div>
            <h3 className="font-mono font-black text-2xl md:text-3xl text-[var(--text-primary)] mb-2">
              {t(`${tKey}.title` as Parameters<typeof t>[0])}
            </h3>
            <p className="font-mono text-sm text-[var(--text-secondary)] leading-relaxed">
              {t(`${tKey}.description` as Parameters<typeof t>[0])}
            </p>
          </div>

          <StackBadges stack={project.stack} />

          <div className="flex items-center gap-3 mt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm font-mono"
            >
              <GithubIcon />
              {t('viewCode')}
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent inline-flex items-center gap-2 px-4 py-2 text-sm font-mono"
              >
                <ExternalIcon />
                {t('viewLive')}
              </a>
            )}
          </div>
        </div>

        {/* Right: screenshot */}
        <div className="w-full lg:w-[480px] shrink-0">
          <ProjectImage image={project.image} alt={project.id} aspectVideo />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Grid project card ────────────────────────────────────────────────────────

function GridCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const t = useTranslations('projects');

  const tKey = project.id
    .replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase()) as Parameters<typeof t>[0];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.08 }}
      className="flat-card flex flex-col overflow-hidden"
    >
      {/* Screenshot */}
      <div className="p-4 pb-0">
        <ProjectImage image={project.image} alt={project.id} />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {project.icon && (
              <span className="text-base shrink-0">{project.icon}</span>
            )}
            <h3 className="font-mono font-bold text-base text-[var(--text-primary)] leading-tight truncate">
              {t(`${tKey}.title` as Parameters<typeof t>[0])}
            </h3>
          </div>
          {project.inProgress && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#F59E0B]/40 text-[#F59E0B] shrink-0">
              {t('inProgress')}
            </span>
          )}
        </div>

        <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
          {t(`${tKey}.description` as Parameters<typeof t>[0])}
        </p>

        <StackBadges stack={project.stack} />

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-2 border-t border-[var(--border)]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <GithubIcon size={13} />
            Code
          </a>
          {project.live && (
            <>
              <span className="text-[var(--text-muted)]">·</span>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:opacity-80 transition-opacity"
              >
                <ExternalIcon size={12} />
                Live ↗
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-40px' });

  const featuredList = projects.filter((p) => p.featured);
  const grid = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-[var(--bg)]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-3 mb-14"
        >
          <p className="section-label">{'// '}{t('label')}</p>
          <h2 className="font-mono font-black text-3xl md:text-4xl text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="font-mono text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Featured projects ── */}
        {featuredList.map((project) => (
          <FeaturedCard key={project.id} project={project} />
        ))}

        {/* ── Grid ── */}
        {grid.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {grid.map((project, i) => (
              <GridCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={isCtaInView ? 'visible' : 'hidden'}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="font-mono text-sm text-[var(--text-secondary)]">{t('cta.title')}</p>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 px-6 py-2.5 text-sm font-mono"
          >
            <GithubIcon size={16} />
            {t('cta.button')}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
