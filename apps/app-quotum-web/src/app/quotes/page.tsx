import { delayInLocalDevOnly } from '#src/utils/debug-delay.ts';
import { addTextAnchorToUrl } from '#src/utils/url-anchor.ts';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createCaller } from '@quotum/app-quotum-server/shared';
import type { Quote } from '@quotum/app-quotum-server/shared-types';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import 'server-only';

export default async function QuotesListPage() {
  let quotes: Quote[] = [];
  let error: Error | null = null;

  const cfContext = getCloudflareContext({ async: true });
  const timezone = (await cfContext).cf?.timezone;

  try {
    await delayInLocalDevOnly();
    quotes = await createCaller({}).quoteList();
  } catch (err: unknown) {
    console.error('Failed to load quotes', err);
    if (err instanceof Error) {
      error = err;
    } else {
      error = new Error('Failed to load quotes', { cause: err });
    }
  }

  if (error) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center p-2">
        <h1
          className={`
            font-serif text-2xl text-neutral-900
            dark:text-white
          `}
        >
          Failed to load quotes
        </h1>
        <div className="h-2" />
        <p
          className={`
            text-sm text-neutral-600
            dark:text-neutral-400
          `}
        >
          {error.toString()}
        </p>
      </main>
    );
  }

  if (quotes.length === 0) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center p-2">
        <h1
          className={`
            font-serif text-2xl text-neutral-900
            dark:text-white
          `}
        >
          No quotes found
        </h1>
      </main>
    );
  }

  return (
    <main className={`mx-auto flex min-h-svh max-w-2xl flex-col items-stretch justify-center px-2 pb-8`}>
      <h1
        className={`
          flex flex-row items-center justify-start self-start px-2 pt-16 pb-4 font-serif text-2xl text-neutral-900
          dark:text-white
        `}
      >
        <Link
          href="/"
          className={`
            font-serif text-2xl text-neutral-900
            dark:text-white
          `}
        >
          Quotum
        </Link>
        <span
          className={`
            px-2 text-neutral-600
            dark:text-neutral-400
          `}
        >
          /
        </span>
        <span
          className={`
            text-neutral-600
            dark:text-neutral-400
          `}
        >
          All quotes
        </span>
      </h1>

      <div className="flex flex-col items-stretch gap-2">
        {quotes.map((quote: Quote) => (
          <div key={quote.id} className="px-2 py-3">
            <blockquote
              className={`
                font-serif text-lg leading-relaxed text-neutral-900
                dark:text-white
              `}
            >
              <span className="pr-1 align-bottom text-4xl select-none">&ldquo;</span>
              <span className="text-lg">{quote.content}</span>
              <span className="pl-1 align-top text-4xl select-none">&rdquo;</span>
            </blockquote>

            <div
              className={`
                flex flex-col items-stretch gap-1 text-sm text-neutral-600
                dark:text-neutral-400
              `}
            >
              <div className="font-medium">
                <Link
                  href={`/q/${quote.id}`}
                  rel="noopener noreferrer"
                  className={`
                    text-blue-700
                    hover:underline
                    dark:text-blue-300
                  `}
                >
                  View quote
                </Link>

                <span className="px-0.5 align-middle font-extrabold select-none"> &middot; </span>

                <Link
                  href={addTextAnchorToUrl(new URL(quote.url), quote.content).toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex flex-row items-center gap-1 text-blue-700
                    hover:underline
                    dark:text-blue-300
                  `}
                >
                  <span className="inline-block">Read original</span>
                  <ExternalLink className="inline-block" size={14} />
                </Link>

                <span className="px-0.5 align-middle font-extrabold select-none"> &middot; </span>

                <span>{quote.title}</span>
              </div>

              <div>
                Created at{' '}
                {new Date(quote.createdAt).toLocaleString(undefined, {
                  timeZone: timezone,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
