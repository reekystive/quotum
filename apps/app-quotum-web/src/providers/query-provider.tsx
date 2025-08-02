'use client';

import { queryClient } from '#src/services/query-client.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import type { FC, ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
