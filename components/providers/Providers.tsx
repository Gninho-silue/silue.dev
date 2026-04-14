'use client';

import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';

const messages = {
  fr: frMessages,
  en: enMessages,
} as const;

type Locale = 'fr' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: 'fr',
  setLocale: () => {},
});

export function useLocaleContext() {
  return useContext(LocaleContext);
}

export default function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null;
    if (stored === 'fr' || stored === 'en') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  if (!mounted) {
    return (
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange={false}
      >
        <NextIntlClientProvider locale="fr" messages={frMessages} timeZone="Africa/Casablanca">
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange={false}
      >
        <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="Africa/Casablanca">
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </LocaleContext.Provider>
  );
}
