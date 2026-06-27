'use client';

import { useLocaleContext } from '@/components/providers/Providers';

export default function LanguageToggle() {
  const { locale, setLocale } = useLocaleContext();

  return (
    <div className="flex items-center gap-0.5 rounded-lg p-0.5 bg-[var(--bg-hover)] border border-[var(--border)]">
      <button
        onClick={() => setLocale('fr')}
        aria-label="Passer en français"
        className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all duration-200 ${
          locale === 'fr'
            ? 'bg-[var(--text-primary)] text-[var(--bg)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
        className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all duration-200 ${
          locale === 'en'
            ? 'bg-[var(--text-primary)] text-[var(--bg)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
