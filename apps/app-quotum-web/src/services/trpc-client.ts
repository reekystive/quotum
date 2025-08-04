import { trpcEndpoint } from '#src/utils/urls.ts';
import { createCaller } from '@quotum/app-quotum-server/shared';
import type { AppRouter } from '@quotum/app-quotum-server/shared-types';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact, type CreateTRPCReact } from '@trpc/react-query';

/**
 * Get tRPC client instance (with caching)
 * Ensures only one instance is created on both server and client
 *
 * @param config Client configuration options
 * @returns tRPC client instance
 */
export const createTrpcClient = () => {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: trpcEndpoint,
        fetch: async (...props) => {
          if (process.env.NODE_ENV === 'development') {
            // add a delay to the request to simulate a slow network
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          return globalThis.fetch(...(props as Parameters<typeof globalThis.fetch>));
        },
      }),
    ],
  });
};

export const trpc = createTrpcClient();

// React Query client
export const api: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>();

export const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url: trpcEndpoint,
      fetch: async (...props) => {
        if (process.env.NODE_ENV === 'development') {
          // add a delay to the request to simulate a slow network
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        return globalThis.fetch(...(props as Parameters<typeof globalThis.fetch>));
      },
    }),
  ],
});

export const trpcServerCaller = createCaller({});
