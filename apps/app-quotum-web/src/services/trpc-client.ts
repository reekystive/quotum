import { getTRPCUrl } from '#src/utils/urls.ts';
import type { AppRouter } from '@quotum/app-trpc-server/shared-types';
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
  const endpoint = getTRPCUrl();
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: endpoint,
        fetch: async (...props) => {
          if (process.env.NODE_ENV === 'development') {
            // add a delay to the request to simulate a slow network
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          return fetch(...props);
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
      url: getTRPCUrl(),
      fetch: async (...props) => {
        if (process.env.NODE_ENV === 'development') {
          // add a delay to the request to simulate a slow network
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        return fetch(...props);
      },
    }),
  ],
});
