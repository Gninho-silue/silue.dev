'use client';

import { useRef } from 'react';
import { Quote } from 'lucide-react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { testimonials, type Testimonial } from '@/content/testimonials';

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Testimonial card ─────────────────────────────────────────────────────────

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const t = useTranslations();

  const tKey = testimonial.id
    .replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="flat-card flex flex-col gap-4 p-6"
    >
      <Quote className="h-5 w-5 text-[var(--accent)] opacity-80" aria-hidden />

      <p className="font-mono text-sm text-[var(--text-secondary)] leading-relaxed italic">
        &ldquo;{t(`testimonials.${tKey}.quote` as Parameters<typeof t>[0])}&rdquo;
      </p>

      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--border)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-black font-mono text-sm font-bold">
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="font-mono text-sm font-bold text-[var(--text-primary)] truncate">
            {testimonial.name}
          </p>
          <p className="font-mono text-xs text-[var(--text-secondary)] truncate">
            {testimonial.role}, {testimonial.organization}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section
      id="testimonials"
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

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
