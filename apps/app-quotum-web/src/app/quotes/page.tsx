'use client';

import { api } from '#src/services/trpc-client.ts';
import type { Quote } from '@quotum/app-quotum-server/shared-types';
import Link from 'next/link';

export default function QuotesListPage() {
  const { data: quotes, isLoading, error } = api.quoteList.useQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Loading quotes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Error Loading Quotes</h1>
          <p className="text-gray-600 dark:text-gray-400">Something went wrong while loading the quotes.</p>
        </div>
      </div>
    );
  }

  if (!quotes || quotes.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">No Quotes Found</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">There are no quotes to display yet.</p>
          <Link href="/debug" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Create Your First Quote
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Quotes</h1>
          <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
            ← Back to Home
          </Link>
        </div>

        <div className="space-y-6">
          {quotes.map((quote: Quote) => (
            <div
              key={quote.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <Link href={`/quote/${quote.id}`} className="block hover:opacity-80">
                <blockquote className="mb-4 font-serif text-lg leading-relaxed text-gray-900 dark:text-white">
                  "{quote.content}"
                </blockquote>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <div className="font-medium">{quote.title}</div>
                    <div className="truncate">
                      <a
                        href={quote.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {quote.url}
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>ID: {quote.id.replace('quote-', '')}</div>
                    <div>{new Date(quote.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {quotes.length >= 1000 && (
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">Showing first 1000 quotes</div>
        )}
      </div>
    </div>
  );
}
