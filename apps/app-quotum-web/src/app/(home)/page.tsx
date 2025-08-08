import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Home',
  description:
    'Discover and create meaningful quotes with Quotum. Your personal quote management platform for organizing, sharing, and discovering inspiring content.',
  openGraph: {
    title: 'Quotum - Quote Management Platform',
    description:
      'Discover and create meaningful quotes with Quotum. Your personal quote management platform for organizing, sharing, and discovering inspiring content.',
    type: 'website',
    url: '/',
  },
  twitter: {
    title: 'Quotum - Quote Management Platform',
    description:
      'Discover and create meaningful quotes with Quotum. Your personal quote management platform for organizing, sharing, and discovering inspiring content.',
  },
};

export default function Home() {
  return (
    <main className={`mx-auto flex min-h-svh max-w-2xl flex-col items-stretch justify-center px-2`}>
      <h1
        className={`
          self-center font-serif text-4xl text-neutral-900
          dark:text-white
        `}
      >
        Quotum
      </h1>

      <div className="h-2" />

      <p
        className={`
          self-center px-2 text-center text-neutral-600 italic
          dark:text-neutral-400
        `}
      >
        A quote is a piece of text that is attributed to a person.
      </p>

      <div className="h-4" />

      <div className="flex flex-col gap-2 self-stretch">
        <Link
          href="/create"
          className={`
            flex items-center gap-2 self-center rounded-sm px-2 py-1 text-neutral-900 transition-colors
            hover:bg-neutral-500/20
            dark:text-white
          `}
        >
          <span className="inline-block">Create a quote</span> <ArrowRight className={`inline-block`} size={16} />
        </Link>

        <Link
          href="/quotes"
          className={`
            flex items-center gap-2 self-center rounded-sm px-2 py-1 text-neutral-900 transition-colors
            hover:bg-neutral-500/20
            dark:text-white
          `}
        >
          <span className="inline-block">View all quotes</span> <ArrowRight className={`inline-block`} size={16} />
        </Link>
      </div>
    </main>
  );
}
