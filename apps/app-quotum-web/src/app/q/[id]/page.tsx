'use client';

import { api } from '#src/services/trpc-client.ts';
import { useParams } from 'next/navigation';

export default function QuotePage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: quote,
    isLoading,
    error,
  } = api.quoteById.useQuery(id, {
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Quote Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">The quote you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl text-center">
        <blockquote className="mb-12 px-4 font-serif text-2xl leading-relaxed text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          "{quote.content}"
        </blockquote>

        <div className="border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">{quote.title}</h2>
          <a
            href={quote.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Read original
          </a>
        </div>
      </div>
    </div>
  );
}
