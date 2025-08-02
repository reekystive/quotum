import Link from 'next/link';
import { FC, ReactNode } from 'react';

export const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div id="layout-root" className="w-full [--top-height:2.5rem]">
      <header className="h-(--top-height) fixed left-0 right-0 top-0 box-border border-b">
        <Link href="/" className="flex h-full w-full items-center justify-center">
          Subby
        </Link>
      </header>
      <main className="pt-(--top-height) w-full overflow-x-clip [--main-height:calc(100vh-var(--top-height))]">
        {children}
      </main>
    </div>
  );
};
