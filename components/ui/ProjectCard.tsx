'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTilt } from '@/hooks/useTilt';
import type { Project, ProjectCategory } from '@/content/projects';

// ─── Category styles ──────────────────────────────────────────────────────────

const CATEGORY_STYLE: Record<
  ProjectCategory,
  { gradient: string; icon: string }
> = {
  ai:        { gradient: 'from-[#8B5CF6] to-[#EC4899]', icon: '🤖' },
  fullstack: { gradient: 'from-[#2453D3] to-[#00D4FF]',  icon: '⚡' },
  mobile:    { gradient: 'from-[#8B5CF6] to-[#06B6D4]',  icon: '📱' },
  devops:    { gradient: 'from-[#F59E0B] to-[#EF4444]',  icon: '🚀' },
};

const MAX_BADGES = 4;

// ─── Framer variant ───────────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 + i * 0.08 },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CardHeader({ image, alt, gradient, icon }: {
  image: string; alt: string; gradient: string; icon: string;
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
          unoptimized
        />
      ) : (
        <div className={`absolute inset-0 bg-linear-to-br ${gradient} flex items-center justify-center`}>
          <span className="text-3xl opacity-60" aria-hidden>{icon}</span>
        </div>
      )}
    </div>
  );
}

function StackBadges({ stack }: { stack: string[] }) {
  const t = useTranslations('projects');
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
          {t('moreTech', { n: extra })}
        </span>
      )}
    </div>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  /** Stagger index for entrance animation */
  index: number;
}

/** Project card with 3D tilt, screenshot/gradient header, stack badges, links.
 *  Add a project to content/projects.ts + messages/fr.json + messages/en.json
 *  to display it automatically in the grid.
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, handlers } = useTilt<HTMLDivElement>(8);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: '-40px' });
  const t = useTranslations('projects');
  const catStyle = CATEGORY_STYLE[project.category];

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
        <CardHeader
          image={project.image}
          alt={project.id}
          gradient={catStyle.gradient}
          icon={catStyle.icon}
        />

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

          <StackBadges stack={project.stack} />
        </div>

        <div className="project-card-footer flex items-center gap-2 px-5 py-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link inline-flex items-center gap-1.5 text-xs font-medium"
            aria-label={`GitHub — ${project.id}`}
          >
            <GithubIcon />
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
                <ExternalIcon />
                {t('viewLive')}
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
