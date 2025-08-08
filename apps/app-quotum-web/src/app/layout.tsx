import { WebsiteStructuredData } from '#src/components/structured-data.tsx';
import { ThemeProvider } from '#src/providers/theme-provider.tsx';
import { getTitleWithEnvPrefix } from '#src/utils/env-title.ts';
import { getThemeFromServerCookie } from '#src/utils/theme-server.ts';
import '#src/utils/tree-shaking.ts';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { clientInit } from './client-init-once.ts';
import './globals.css';
import { RootLayout } from './root-layout.tsx';
import { RootProviders } from './root-providers.tsx';

if (typeof window !== 'undefined') {
  clientInit();
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: {
    default: getTitleWithEnvPrefix('Quotum - Quote Management Platform'),
    template: getTitleWithEnvPrefix('%s | Quotum'),
  },
  description: 'Create collections, share quotes, and build your personal quote library.',
  keywords: ['quotes', 'quote management', 'inspiration', 'quote collection', 'personal library', 'sharing quotes'],
  authors: [{ name: 'Quotum Team' }],
  creator: 'Quotum',
  publisher: 'Quotum',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Quotum',
    title: 'Quotum - Quote Management Platform',
    description:
      'Organize, share, and discover inspiring quotes with Quotum. Create your personal quote collection and share wisdom with the world.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quotum - Quote Management Platform',
    description:
      'Organize, share, and discover inspiring quotes with Quotum. Create your personal quote collection and share wisdom with the world.',
    images: ['/og-image.png'],
    creator: '@quotum',
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

// eslint-disable-next-line react-refresh/only-export-components
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await getThemeFromServerCookie()) satisfies 'light' | 'dark' | 'system' | null;

  return (
    <html lang="en" suppressHydrationWarning data-theme={theme ?? 'system'}>
      <head>
        <WebsiteStructuredData />
      </head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        <ThemeProvider themeFromCookie={theme}>
          <RootProviders>
            <RootLayout>{children}</RootLayout>
          </RootProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
