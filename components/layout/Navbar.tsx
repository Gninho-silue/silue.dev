'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';

const NAV_SECTIONS = ['about', 'stack', 'projects', 'experience', 'contact'] as const;

function CVDropdown({ className = '' }: { className?: string }) {
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
      ? { label: t('cvFrench'), href: '/cv-silue-fr.pdf', flag: '📄' }
      : { label: t('cvEnglish'), href: '/cv-silue-en.pdf', flag: '📄' },
    isFR
      ? { label: t('cvEnglish'), href: '/cv-silue-en.pdf', flag: '📄' }
      : { label: t('cvFrench'), href: '/cv-silue-fr.pdf', flag: '📄' },
  ];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #2453D3, #00D4FF)' }}
        aria-expanded={open}
        aria-haspopup="listbox"
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-52 rounded-xl border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md shadow-xl overflow-hidden z-50"
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
                <span aria-hidden="true">{opt.flag}</span>
                {opt.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_SECTIONS as unknown as string[]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const navLinks = NAV_SECTIONS.map((id) => ({
    id,
    label: t(id),
  }));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-background/80 border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            aria-label="Back to top"
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #2453D3, #00D4FF)' }}
            >
              GS
            </div>
            <span className="font-display font-semibold text-foreground group-hover:text-brand-primary transition-colors duration-200">
              Silué
            </span>
          </button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`relative px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                    activeSection === id
                      ? 'text-brand-primary font-medium'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {label}
                  {activeSection === id && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-md bg-brand-primary/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* CV Download dropdown */}
            <CVDropdown className="hidden md:block" />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-surface transition-colors duration-200 gap-1.5"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-foreground rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-[var(--text-primary)] rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-foreground rounded-full origin-center"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden backdrop-blur-md bg-background/95 border-b border-border shadow-lg"
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors duration-200 ${
                    activeSection === id
                      ? 'text-brand-primary font-medium bg-brand-primary/10'
                      : 'text-muted hover:text-foreground hover:bg-surface'
                  }`}
                >
                  {label}
                </button>
              ))}

              <div className="flex items-center justify-between pt-3 mt-1 border-t border-border">
                <div className="flex items-center gap-2 sm:hidden">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <CVDropdown />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
