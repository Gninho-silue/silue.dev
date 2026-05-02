import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '@/components/providers/Providers';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const BASE_URL = 'https://silue.dev';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Gninninmaguignon Silué — Full-Stack Developer',
    template: '%s | Gninninmaguignon Silué',
  },
  description:
    'Full-Stack Developer specializing in Cloud-Native architectures, Java Spring Boot, React and Node.js. Available July 2026 for remote opportunities.',
  keywords: [
    'Full-Stack Developer',
    'Java Spring Boot',
    'React',
    'Node.js',
    'Microservices',
    'Cloud-Native',
    'Casablanca',
    'Remote',
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
    title: 'Gninninmaguignon Silué — Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in Cloud-Native architectures, Java Spring Boot, React and Node.js. Available July 2026 for remote opportunities.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gninninmaguignon Silué — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gninninmaguignon Silué — Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in Cloud-Native architectures, Java Spring Boot, React and Node.js. Available July 2026 for remote opportunities.',
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
  jobTitle: 'Full-Stack Developer',
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
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ScrollProgressBar />
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
