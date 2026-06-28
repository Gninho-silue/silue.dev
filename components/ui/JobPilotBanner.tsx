'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

const STORAGE_KEY = 'jobpilot-banner-dismissed';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 5000;

export default function JobPilotBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('banner');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const dismissedAt = parseInt(raw, 10);
      if (!isNaN(dismissedAt) && Date.now() - dismissedAt < SEVEN_DAYS_MS) return;
    }
    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 w-[300px] flat-card p-4 shadow-lg"
          role="complementary"
          aria-label="JobPilot"
        >
          {/* Close */}
          <button
            onClick={dismiss}
            aria-label={t('dismiss')}
            className="absolute top-3 right-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            <X size={14} />
          </button>

          {/* Badge */}
          <span className="inline-block font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B] mb-3">
            {t('badge')}
          </span>

          {/* Title */}
          <p className="font-mono font-black text-lg text-[var(--text-primary)] leading-tight mb-1">
            JobPilot
          </p>

          {/* Subtitle */}
          <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
            {t('subtitle')}
          </p>

          {/* CTA */}
          <a
            href="https://jobpilot-jet.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="btn-accent block text-center font-mono text-sm font-medium px-4 py-2 rounded-lg"
          >
            {t('cta')}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
