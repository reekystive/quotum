import { QuoteStructuredData } from '#src/components/structured-data.tsx';
import { delayInLocalDevOnly } from '#src/utils/debug-delay.ts';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createCaller } from '@quotum/app-quotum-server/shared';
import { Quote } from '@quotum/app-quotum-server/shared-types';
import { addTextAnchorToUrl } from '@quotum/utils';
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import 'server-only';

interface QuotePageProps {
  params: Promise<{
    id: string;
  }>;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const quote = await createCaller({}).quoteById(id);

    if (!quote) {
      return {
        title: 'Quote not found - Quotum',
        description: 'The requested quote could not be found.',
      };
    }

    const truncatedContent = quote.content.length > 160 ? quote.content.substring(0, 157) + '...' : quote.content;

    const title = `"${truncatedContent}" - ${quote.title}`;
    const description = `A quote from ${quote.title}: "${truncatedContent}"`;
    const url = `https://quotum.me/q/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: 'Quotum',
        type: 'article',
        images: [
          {
            url: `/api/og/quote/${id}`,
            width: 1200,
            height: 630,
            alt: `Quote from ${quote.title}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`/api/og/quote/${id}`],
        site: '@quotum',
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: 'Quote - Quotum',
      description: 'Share and discover meaningful quotes.',
    };
  }
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;
  let quote: Quote | null = null;
  let error: Error | null = null;

  const cfContext = getCloudflareContext({ async: true });
  const timezone = (await cfContext).cf?.timezone;

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
        <h1
          className={`
            font-serif text-2xl text-neutral-900
            dark:text-white
          `}
        >
          Failed to load quote
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

  if (!quote) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center p-2">
        <h1
          className={`
            font-serif text-2xl text-neutral-900
            dark:text-white
          `}
        >
          Quote not found
        </h1>
      </main>
    );
  }

  return (
    <>
      <QuoteStructuredData quote={quote} />
      <main className={`mx-auto flex min-h-svh max-w-2xl flex-col items-stretch justify-center px-4`}>
        <blockquote
          className={`
            font-serif leading-relaxed text-neutral-900
            dark:text-white
          `}
        >
          <span className="pr-1 align-bottom text-6xl select-none">&ldquo;</span>
          <span className="text-2xl">{quote.content}</span>
          <span className="pl-1 align-top text-6xl select-none">&rdquo;</span>
        </blockquote>

        <div className="mt-4 mb-8 h-[1px] bg-neutral-500/20"></div>

        <div
          className={`
            self-center text-sm font-medium text-neutral-600
            dark:text-neutral-400
          `}
        >
          <span>{quote.title}</span>

          <span className="px-0.5 align-middle font-extrabold select-none"> &middot; </span>

          <Link
            href={addTextAnchorToUrl({
              url: new URL(quote.url),
              anchorTextStart: quote.anchorTextStart ?? quote.content,
              anchorTextEnd: quote.anchorTextEnd ?? undefined,
              anchorPrefix: quote.anchorPrefix ?? undefined,
              anchorSuffix: quote.anchorSuffix ?? undefined,
            }).toString()}
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
        </div>

        <div className="h-2"></div>

        <div
          className={`
            self-center text-sm text-neutral-600
            dark:text-neutral-400
          `}
        >
          Created at{' '}
          {new Date(quote.createdAt).toLocaleString(undefined, {
            timeZone: timezone,
          })}
        </div>
      </main>
    </>
  );
}
