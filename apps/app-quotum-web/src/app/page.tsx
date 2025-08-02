import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-lg p-8 text-center">
        <h1 className="mb-2 font-serif text-4xl text-gray-900 dark:text-white">Quotum</h1>
        <p className="mb-8 italic text-gray-600 dark:text-gray-400">一句引文</p>

        <div className="space-y-4">
          <Link
            href="/debug"
            className="block w-full rounded-md border border-gray-300 p-4 text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
          >
            Debug: Create Quote
          </Link>

          <div className="text-sm text-gray-500 dark:text-gray-400">Create a quote and get a shareable link</div>
        </div>
      </div>
    </div>
  );
}
