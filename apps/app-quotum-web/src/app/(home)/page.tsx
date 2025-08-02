import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-stretch justify-center">
      <h1 className="self-center font-serif text-4xl text-gray-900 dark:text-white">Quotum</h1>

      <div className="h-2" />

      <p className="max-w-2xl self-center px-2 italic text-gray-600 dark:text-gray-400">
        A quote is a piece of text that is attributed to a person.
      </p>

      <div className="h-4" />

      <div className="flex flex-col gap-2 self-stretch">
        <Link
          href="/create"
          className="flex items-center gap-2 self-center rounded-sm px-2 py-1 text-gray-900 transition-colors hover:bg-neutral-500/20 dark:text-white"
        >
          <span className="inline-block">Create a quote</span> <ExternalLink className="inline-block" size={16} />
        </Link>

        <Link
          href="/quotes"
          className="flex items-center gap-2 self-center rounded-sm px-2 py-1 text-gray-900 transition-colors hover:bg-neutral-500/20 dark:text-white"
        >
          <span className="inline-block">View all quotes</span> <ExternalLink className="inline-block" size={16} />
        </Link>
      </div>
    </main>
  );
}
