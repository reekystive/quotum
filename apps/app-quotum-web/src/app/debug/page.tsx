'use client';

import { api } from '#src/services/trpc-client.ts';
import { useState } from 'react';

export default function DebugPage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createQuoteMutation = api.quoteCreate.useMutation({
    onSuccess: (data) => {
      if (data?.id) {
        setResult(data.id);
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error creating quote:', error);
      setResult('Error creating quote');
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    createQuoteMutation.mutate({
      content,
      title,
      url,
    });
  };

  return (
    <div className="min-h-screen bg-white p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Debug: Create Quote</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quote Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              rows={4}
              placeholder="Enter the quote content..."
            />
          </div>

          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Page Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Enter the page title..."
            />
          </div>

          <div>
            <label htmlFor="url" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Page URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="https://example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Creating...' : 'Create Quote'}
          </button>
        </form>

        {result && (
          <div className="mt-8 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Result:</h2>
            <p className="font-mono text-gray-700 dark:text-gray-300">{result}</p>
            {result.startsWith('quote-') && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                View at:{' '}
                <a href={`/quote/${result}`} className="text-blue-600 hover:underline dark:text-blue-400">
                  /quote/{result}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
