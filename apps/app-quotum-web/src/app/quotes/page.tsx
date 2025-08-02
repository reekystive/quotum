import { trpc } from '#src/services/trpc-client.ts';
import type { Quote } from '@quotum/app-quotum-server/shared-types';
import Link from 'next/link';

export default async function QuotesListPage() {
  let quotes: Quote[] = [];
  let error: Error | null = null;

  try {
    quotes = await trpc.quoteList.query();
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err;
    } else {
      error = new Error('Failed to load quotes', { cause: err });
    }
  }

  if (error) {
    return 'Failed to load quotes';
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-stretch justify-center px-2 pb-8">
      <h1 className="flex flex-row items-center justify-start self-start pb-4 pt-16 font-serif text-2xl text-neutral-900 dark:text-white">
        <Link href="/" className="font-serif text-2xl text-neutral-900 dark:text-white">
          Quotum
        </Link>
        <span className="px-2 text-neutral-600 dark:text-neutral-400">/</span>
        <span className="text-neutral-600 dark:text-neutral-400">All quotes</span>
      </h1>

      <div className="flex flex-col items-stretch gap-2">
        {quotes.map((quote: Quote) => (
          <div key={quote.id} className="px-4 py-3">
            <blockquote className="font-serif text-lg leading-relaxed text-neutral-900 dark:text-white">
              <span className="select-none pr-1 align-bottom text-4xl">&ldquo;</span>
              <span className="text-lg">{quote.content}</span>
              <span className="select-none pl-1 align-top text-4xl">&rdquo;</span>
            </blockquote>

            <div className="flex flex-col items-stretch gap-1 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="font-medium">
                <Link
                  href={quote.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline dark:text-blue-300"
                >
                  View original
                </Link>

                <span className="select-none px-0.5 align-middle font-extrabold"> &middot; </span>

                <span className="text-neutral-600 dark:text-neutral-400">{quote.title}</span>
              </div>

              <div>Created at {new Date(quote.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
