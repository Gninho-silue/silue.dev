'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import CVDownloadDropdown from '@/components/ui/CVDownloadDropdown';

const NAV_SECTIONS = ['about', 'stack', 'projects', 'experience', 'testimonials', 'contact'] as const;

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
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const navLinks = NAV_SECTIONS.map((id) => ({ id, label: t(id) }));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 gap-4 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            aria-label={t('backToTop')}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <span className="font-mono font-bold text-sm text-[var(--accent-fill)]">&lt;/&gt;</span>
            <span className="font-mono font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
              Silué
            </span>
          </button>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`relative whitespace-nowrap px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                    activeSection === id
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {label}
                  {activeSection === id && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--accent-fill)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <CVDownloadDropdown variant="navbar" align="right" className="hidden lg:block" />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileOpen}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-[var(--bg-hover)] transition-colors duration-200 gap-1.5"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-[var(--text-primary)] rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-[var(--text-primary)] rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-[var(--text-primary)] rounded-full origin-center"
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
            className="fixed top-16 left-0 right-0 z-40 lg:hidden backdrop-blur-md bg-[var(--bg)]/95 border-b border-[var(--border)]"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors duration-200 ${
                    activeSection === id
                      ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  {label}
                </button>
              ))}

              <div className="flex items-center justify-between pt-3 mt-1 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 sm:hidden">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <CVDownloadDropdown variant="navbar" align="right" />
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
            className="fixed inset-0 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
