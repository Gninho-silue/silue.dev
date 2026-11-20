import type { Metadata } from 'next';
import { Geist, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '@/components/providers/Providers';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const BASE_URL = 'https://silue-dev.vercel.app';

const TITLE = 'Gninninmaguignon Silué — Backend-First Full-Stack Engineer';
const DESCRIPTION =
  'Java / Spring Boot backends and React front ends. ENSA Al Hoceima engineering graduate (June 2026), based in Casablanca, open to hybrid or remote roles.';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: '%s | Gninninmaguignon Silué',
  },
  description: DESCRIPTION,
  keywords: [
    'Backend Developer',
    'Full-Stack Developer',
    'Java',
    'Spring Boot',
    'Microservices',
    'React',
    'Kafka',
    'Casablanca',
    'Morocco',
  ],
  authors: [{ name: 'Gninninmaguignon Silué' }],
  creator: 'Gninninmaguignon Silué',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'Gninninmaguignon Silué',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gninninmaguignon Silué',
  jobTitle: 'Backend-First Full-Stack Engineer',
  url: BASE_URL,
  sameAs: [
    'https://github.com/Gninho-silue',
    'https://linkedin.com/in/gninema-silue',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ScrollProgressBar />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
