'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  /** 'navbar' — gradient pill button; 'about' — primary CTA with download icon */
  variant?: 'navbar' | 'about';
  /** Which side the dropdown opens from (default: right) */
  align?: 'left' | 'right';
  className?: string;
}

export default function CVDownloadDropdown({ variant = 'navbar', align = 'right', className = '' }: Props) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const isFR = locale === 'fr';

  const options = [
    isFR
      ? { label: t('cvFrench'), href: '/cv-silue-fr.pdf' }
      : { label: t('cvEnglish'), href: '/cv-silue-en.pdf' },
    isFR
      ? { label: t('cvEnglish'), href: '/cv-silue-en.pdf' }
      : { label: t('cvFrench'), href: '/cv-silue-fr.pdf' },
  ];

  const alignClass = align === 'left' ? 'left-0' : 'right-0';

  return (
    <div ref={ref} className={`relative ${className}`}>
      {variant === 'navbar' ? (
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #2453D3, #00D4FF)' }}
        >
          {t('downloadCV')}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>
      ) : (
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="about-cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t('downloadCV')}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute ${alignClass} mt-2 w-52 rounded-xl border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md shadow-xl overflow-hidden z-50`}
            role="listbox"
          >
            {options.map((opt) => (
              <a
                key={opt.href}
                href={opt.href}
                download
                role="option"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-3 text-sm text-[var(--text-primary)] hover:text-[#2453D3] hover:bg-[#2453D3]/10 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
              >
                <span aria-hidden="true">📄</span>
                {opt.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
