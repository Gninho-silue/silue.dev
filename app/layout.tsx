import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '@/components/providers/Providers';
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://silue.dev'
  ),
  title: {
    default: 'Gninninmaguignon Silué — Full-Stack Developer',
    template: '%s | Gninninmaguignon Silué',
  },
  description:
    'Full-Stack Developer specializing in distributed systems and modern web applications. Based in Casablanca, open to remote opportunities.',
  keywords: [
    'Full-Stack Developer',
    'Java',
    'Spring Boot',
    'React',
    'Next.js',
    'TypeScript',
    'Docker',
    'Kubernetes',
    'Casablanca',
    'Maroc',
    'remote',
  ],
  authors: [{ name: 'Gninninmaguignon Silué' }],
  creator: 'Gninninmaguignon Silué',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: 'https://silue.dev',
    siteName: 'Gninninmaguignon Silué',
    title: 'Gninninmaguignon Silué — Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in distributed systems and modern web applications.',
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
      'Full-Stack Developer specializing in distributed systems and modern web applications.',
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
  icons: {
    icon: '/favicon.ico',
  },
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
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
