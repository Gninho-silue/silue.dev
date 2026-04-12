'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { projects, type Project, type ProjectCategory } from '@/content/projects';
import { social } from '@/content/personal';
import { useTilt } from '@/hooks/useTilt';

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_BADGES = 4;

const CATEGORY_STYLE: Record<
  ProjectCategory,
  { gradient: string; icon: string; label: string }
> = {
  ai:       { gradient: 'from-[#8B5CF6] to-[#EC4899]', icon: '🤖', label: 'AI' },
  fullstack:{ gradient: 'from-[#2453D3] to-[#00D4FF]', icon: '⚡', label: 'Full-Stack' },
  mobile:   { gradient: 'from-[#8B5CF6] to-[#06B6D4]', icon: '📱', label: 'Mobile' },
  devops:   { gradient: 'from-[#F59E0B] to-[#EF4444]', icon: '🚀', label: 'DevOps' },
};

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 + i * 0.08 },
  }),
};

// ─── GitHub icon ──────────────────────────────────────────────────────────────

function GithubIcon({ size = 16 }: { size?: number }) {
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

function StackBadges({ stack, moreTpl }: { stack: string[]; moreTpl: string }) {
  const shown = stack.slice(0, MAX_BADGES);
  const extra = stack.length - MAX_BADGES;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((tech) => (
        <span key={tech} className="project-tech-badge font-mono text-[11px] px-2 py-0.5 rounded-md">
          {tech}
        </span>
      ))}
      {extra > 0 && (
        <span className="project-tech-badge-extra font-mono text-[11px] px-2 py-0.5 rounded-md">
          {moreTpl.replace('{n}', String(extra))}
        </span>
      )}
    </div>
  );
}

// ─── Mock browser window ──────────────────────────────────────────────────────

function BrowserMock({
  gradient,
  icon,
  image,
  alt,
}: {
  gradient: string;
  icon: string;
  image: string;
  alt: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="project-browser w-full rounded-xl overflow-hidden shadow-2xl">
      {/* Chrome bar */}
      <div className="project-browser-bar flex items-center gap-1.5 px-3 py-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <div className="project-browser-url ml-3 flex-1 h-4 rounded-full" />
      </div>
      {/* Viewport */}
      <div className="relative aspect-video">
        {!imgError ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-80`}>
            <div aria-hidden className="project-browser-grid absolute inset-0 opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-50" aria-hidden>{icon}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Project card header — screenshot or gradient fallback ───────────────────

function CardHeader({
  image,
  alt,
  gradient,
  icon,
}: {
  image: string;
  alt: string;
  gradient: string;
  icon: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative project-card-header overflow-hidden">
      {!imgError ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`absolute inset-0 bg-linear-to-br ${gradient} flex items-center justify-center`}>
          <span className="text-3xl opacity-60" aria-hidden>{icon}</span>
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
  const catStyle = CATEGORY_STYLE[project.category];

  // pfe-techpal → pfeTechpal
  const tKey = project.id
    .replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase()) as Parameters<typeof t>[0];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="project-featured-card card-glow rounded-2xl p-6 md:p-8 mb-12"
    >
      {/* Featured label */}
      <div className="flex items-center gap-2 mb-6">
        <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-linear-to-r ${catStyle.gradient} text-white`}>
          {catStyle.icon} {t('featured')}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left: info */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
              {t(`${tKey}.title` as Parameters<typeof t>[0])}
            </h3>
            <p className="font-sans text-base text-muted leading-relaxed">
              {t(`${tKey}.description` as Parameters<typeof t>[0])}
            </p>
          </div>

          <StackBadges stack={project.stack} moreTpl={t('moreTech')} />

          <div className="flex items-center gap-3 mt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            >
              <GithubIcon />
              {t('viewCode')}
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              >
                <ExternalIcon />
                {t('viewLive')}
              </a>
            )}
          </div>
        </div>

        {/* Right: mock browser */}
        <div className="w-full lg:w-120 xl:w-130 shrink-0">
          <BrowserMock
            gradient={catStyle.gradient}
            icon={catStyle.icon}
            image={project.image}
            alt={project.id}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Regular project card ─────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, handlers } = useTilt<HTMLDivElement>(8);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: '-40px' });
  const t = useTranslations('projects');
  const catStyle = CATEGORY_STYLE[project.category];

  // Build translation key: pfe-techpal → pfeTechpal
  const tKey = project.id
    .replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase())
    .replace(/^-/, '') as Parameters<typeof t>[0];

  return (
    <motion.div
      ref={wrapRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="project-card-perspective h-full"
    >
      <div
        ref={ref}
        {...handlers}
        className="project-card project-tilt-card h-full rounded-xl overflow-hidden flex flex-col"
      >
        {/* Card header — screenshot or gradient fallback */}
        <CardHeader
          image={project.image}
          alt={project.id}
          gradient={catStyle.gradient}
          icon={catStyle.icon}
        />

        {/* Body */}
        <div className="flex flex-col flex-1 gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-lg text-foreground leading-tight">
              {t(`${tKey}.title` as Parameters<typeof t>[0])}
            </h3>
            {project.inProgress && (
              <span className="project-in-progress shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                🔄 {t('inProgress')}
              </span>
            )}
          </div>

          <p className="font-sans text-sm text-muted leading-relaxed line-clamp-2">
            {t(`${tKey}.description` as Parameters<typeof t>[0])}
          </p>

          <StackBadges stack={project.stack} moreTpl={t('moreTech')} />
        </div>

        {/* Footer links */}
        <div className="project-card-footer flex items-center gap-2 px-5 py-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link inline-flex items-center gap-1.5 text-xs font-medium"
            aria-label={`GitHub — ${project.id}`}
          >
            <GithubIcon size={14} />
            {t('viewCode')}
          </a>
          {project.live && (
            <>
              <span className="project-link-divider mx-1" aria-hidden />
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link inline-flex items-center gap-1.5 text-xs font-medium"
                aria-label={`Live — ${project.id}`}
              >
                <ExternalIcon size={12} />
                {t('viewLive')}
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

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const grid = projects.filter((p) => p.id !== featured.id);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background accent */}
      <div
        aria-hidden
        className="absolute -top-24 right-0 w-96 h-96 rounded-full pointer-events-none project-bg-orb"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

        {/* ── Featured project ── */}
        <FeaturedCard project={featured} />

        {/* ── Projects grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grid.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={isCtaInView ? 'visible' : 'hidden'}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="font-sans text-muted text-base">{t('cta.title')}</p>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          >
            <GithubIcon size={16} />
            {t('cta.button')}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
