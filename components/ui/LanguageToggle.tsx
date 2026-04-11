'use client';

import { useLocaleContext } from '@/components/providers/Providers';

export default function LanguageToggle() {
  const { locale, setLocale } = useLocaleContext();

  return (
    <div className="flex items-center gap-0.5 rounded-lg p-0.5 bg-surface border border-border">
      <button
        onClick={() => setLocale('fr')}
        aria-label="Passer en français"
        className={`px-2.5 py-1 rounded-md text-xs font-semibold font-mono transition-all duration-200 ${
          locale === 'fr'
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-muted hover:text-foreground'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
        className={`px-2.5 py-1 rounded-md text-xs font-semibold font-mono transition-all duration-200 ${
          locale === 'en'
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-muted hover:text-foreground'
        }`}
      >
        EN
      </button>
    </div>
  );
}
