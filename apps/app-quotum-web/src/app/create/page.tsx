'use client';

import { api } from '#src/services/trpc-client.ts';
import Link from 'next/link';
import { useState } from 'react';

export default function DebugPage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const createQuoteMutation = api.quoteCreate.useMutation({
    onSuccess: (data) => {
      console.log('Quote created:', data);
    },
    onError: (error) => {
      console.error('Error creating quote:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createQuoteMutation.mutate({
      content,
      title,
      url,
    });
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-stretch justify-center px-2">
        <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white">Create a quote</h1>

        <div className="h-4" />

        <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
          <label htmlFor="content" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Quote content to share
          </label>

          <div className="h-1" />

          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="resize-none rounded-sm bg-white p-3 text-neutral-900 outline-1 -outline-offset-1 outline-neutral-200 dark:bg-neutral-900 dark:text-white dark:outline-neutral-700"
            rows={5}
            placeholder="Enter the quote content..."
          />

          <div className="h-3" />

          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Give it a title
          </label>

          <div className="h-1" />

          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="resize-none rounded-sm bg-white p-3 text-neutral-900 outline-1 -outline-offset-1 outline-neutral-200 dark:bg-neutral-900 dark:text-white dark:outline-neutral-700"
            placeholder="Enter the page title..."
          />

          <div className="h-3" />

          <label htmlFor="url" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Where did you find it?
          </label>

          <div className="h-1" />

          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="resize-none rounded-sm bg-white p-3 text-neutral-900 outline-1 -outline-offset-1 outline-neutral-200 dark:bg-neutral-900 dark:text-white dark:outline-neutral-700"
            placeholder="https://medium.com/..."
          />

          <div className="h-6" />

          <button
            type="submit"
            disabled={createQuoteMutation.isPending}
            className="w-full cursor-pointer rounded-sm border border-neutral-200 bg-white px-4 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-500/5 disabled:bg-neutral-500/10 dark:border-neutral-700 dark:bg-black dark:text-white"
          >
            {createQuoteMutation.isPending ? 'Creating...' : 'Create quote'}
          </button>
        </form>
      </main>

      {createQuoteMutation.isSuccess && (
        <div className="fixed inset-0 grid place-content-center bg-black/10 backdrop-blur-md">
          <div className="rounded-sm border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="font-serif text-2xl font-medium text-neutral-900 dark:text-white">Your quote is ready</h2>

            <div className="h-2" />

            <p className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
              Quote ID: {createQuoteMutation.data?.id}
            </p>

            <div className="h-2" />

            <Link
              href={`/q/${createQuoteMutation.data?.id}`}
              className="text-blue-700 hover:underline dark:text-blue-300"
            >
              View at {baseUrl}/q/{createQuoteMutation.data?.id}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
