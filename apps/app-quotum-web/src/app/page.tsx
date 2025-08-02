import Link from 'next/link';

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-fit flex-col items-stretch justify-center gap-1 p-2 font-bold uppercase">
      <Link
        className="border border-rose-500/20 p-[1.25rem] text-center text-white transition-all hover:rounded-xl active:scale-95 dark:border-rose-900/80"
        href="/demos/mutation"
      >
        Mutation Demo
      </Link>
      <Link
        className="border border-rose-500/20 p-[1.25rem] text-center text-white transition-all hover:rounded-xl active:scale-95 dark:border-rose-900/80"
        href="/demos/email"
      >
        Email Demo
      </Link>
      <Link
        className="border border-rose-500/20 p-[1.25rem] text-center text-white transition-all hover:rounded-xl active:scale-95 dark:border-rose-900/80"
        href="/demos/theme-toggle"
      >
        Theme Toggle Demo
      </Link>
    </div>
  );
}
