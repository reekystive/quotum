'use client';

import { queryClient } from '#src/services/query-client.ts';
import { api, trpcClient } from '#src/services/trpc-client.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import type { FC, ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};
