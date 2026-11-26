'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { projects, type Project } from '@/content/projects';
import { social } from '@/content/personal';

const MAX_TAGS = 4;

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function GithubIcon({ size = 14 }: { size?: number }) {
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

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

const linkClass = 'inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 text-sm';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const t = useTranslations('projects');

  const tKey = project.id.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
  const title = t(`${tKey}.title` as Parameters<typeof t>[0]);
  const description = t(`${tKey}.description` as Parameters<typeof t>[0]);

  const shownTags = project.stack.slice(0, MAX_TAGS);
  const hiddenCount = project.stack.length - shownTags.length;

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: (index % 2) * 0.06 }}
      className="flat-card flex h-full flex-col gap-4 p-4 sm:p-5"
    >
      {/* Screenshot: 2:1 frame, matching most captures (1920x940) */}
      {(() => {
        const frameClass =
          'relative block aspect-[2/1] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-hover)]';
        const image = (
          <Image
            src={project.image}
            alt={t('imageAlt', { title })}
            fill
            sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
            loading={index < 2 ? 'eager' : 'lazy'}
            fetchPriority={index < 2 ? 'high' : 'auto'}
            className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'}
          />
        );
        return project.imageZoom ? (
          <a
            href={project.image}
            target="_blank"
            rel="noopener noreferrer"
            title={t('openImage')}
            className={`${frameClass} cursor-zoom-in transition-colors hover:border-[var(--border-strong)]`}
          >
            {image}
          </a>
        ) : (
          <div className={frameClass}>{image}</div>
        );
      })()}

      {/* Title + year */}
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        {project.year && (
          <span className="shrink-0 font-mono text-xs text-[var(--text-muted)]">{project.year}</span>
        )}
      </header>

      {/* Description */}
      <p
        className="line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]"
        title={description}
      >
        {description}
      </p>

      {/* Stack */}
      <ul className="flex flex-wrap gap-1.5" aria-label={t('stackLabel')}>
        {shownTags.map((tech) => (
          <li key={tech} className="tag">{tech}</li>
        ))}
        {hiddenCount > 0 && (
          <li className="tag" title={project.stack.slice(MAX_TAGS).join(', ')}>
            {t('moreTech', { n: hiddenCount })}
          </li>
        )}
      </ul>

      {/* Links */}
      <footer className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={`btn-secondary ${linkClass}`}>
            <GithubIcon />
            {t('viewCode')}
          </a>
        )}
        {project.privateCode && (
          <span className={`btn-disabled ${linkClass}`} aria-disabled="true">
            <LockIcon />
            {t(`privateCode.${project.privateCode}`)}
          </span>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className={`btn-secondary ${linkClass}`}>
            <ExternalIcon />
            {/* A project can name its demo button (e.g. "Try the demo (no sign-up)") */}
            {t.has(`${tKey}.liveLabel` as Parameters<typeof t>[0])
              ? t(`${tKey}.liveLabel` as Parameters<typeof t>[0])
              : t('viewLive')}
          </a>
        )}
      </footer>
    </motion.article>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  // Featured projects first; no other visual difference.
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

  return (
    <section id="projects" className="relative py-16 md:py-24 bg-[var(--bg)]">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-3 mb-12"
        >
          <p className="section-label">{'// '}{t('label')}</p>
          <h2 className="font-semibold text-3xl md:text-4xl text-[var(--text-primary)]">
            {t('title')}
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-[65ch] leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Grid: 1 column on mobile, 2 on desktop, equal height per row ── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {ordered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]">{t('cta.title')}</p>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <GithubIcon size={16} />
            {t('cta.button')}
          </a>
        </div>

      </div>
    </section>
  );
}
