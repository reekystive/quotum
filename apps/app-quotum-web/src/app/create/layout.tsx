import type { Metadata } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Create Quote',
  description:
    'Create and share a new quote with Quotum. Add quotes from articles, books, or any source with proper attribution.',
  openGraph: {
    title: 'Create Quote - Quotum',
    description:
      'Create and share a new quote with Quotum. Add quotes from articles, books, or any source with proper attribution.',
    type: 'website',
    url: '/create',
  },
  twitter: {
    title: 'Create Quote - Quotum',
    description:
      'Create and share a new quote with Quotum. Add quotes from articles, books, or any source with proper attribution.',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
