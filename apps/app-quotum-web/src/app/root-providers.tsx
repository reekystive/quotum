import { QueryProvider } from '#src/providers/query-provider.tsx';
import { FC, ReactNode } from 'react';
import { ClientInitEffect } from './client-init-effect.tsx';

export const RootProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ClientInitEffect />
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};
