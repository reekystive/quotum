import { delayInLocalDevOnly } from '#src/utils/debug-delay.ts';
import { addTextAnchorToUrl } from '#src/utils/url-anchor.ts';
import { createCaller } from '@quotum/app-quotum-server/shared';
import { Quote } from '@quotum/app-quotum-server/shared-types';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import 'server-only';

interface QuotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;
  let quote: Quote | null = null;
  let error: Error | null = null;

  try {
    await delayInLocalDevOnly();
    quote = await createCaller({}).quoteById(id);
  } catch (err: unknown) {
    console.error('Failed to load quote', err);
    if (err instanceof Error) {
      error = err;
    } else {
      error = new Error('Failed to load quote', { cause: err });
    }
  }

  if (error) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center p-2">
        <h1 className="font-serif text-2xl text-neutral-900 dark:text-white">Failed to load quote</h1>
        <div className="h-2" />
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{error.toString()}</p>
      </main>
    );
  }

  if (!quote) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center p-2">
        <h1 className="font-serif text-2xl text-neutral-900 dark:text-white">Quote not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-stretch justify-center px-4">
      <blockquote className="font-serif leading-relaxed text-neutral-900 dark:text-white">
        <span className="select-none pr-1 align-bottom text-6xl">&ldquo;</span>
        <span className="text-2xl">{quote.content}</span>
        <span className="select-none pl-1 align-top text-6xl">&rdquo;</span>
      </blockquote>

      <div className="mb-8 mt-4 h-[1px] bg-neutral-500/20"></div>

      <div className="self-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
        <span>{quote.title}</span>

        <span className="select-none px-0.5 align-middle font-extrabold"> &middot; </span>

        <Link
          href={addTextAnchorToUrl(new URL(quote.url), quote.content).toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-row items-center gap-1 text-blue-700 hover:underline dark:text-blue-300"
        >
          <span className="inline-block">Read original</span>
          <ExternalLink className="inline-block" size={14} />
        </Link>
      </div>

      <div className="h-2"></div>

      <div className="self-center text-sm text-neutral-600 dark:text-neutral-400">
        Created at {new Date(quote.createdAt).toLocaleString()}
      </div>
    </main>
  );
}
