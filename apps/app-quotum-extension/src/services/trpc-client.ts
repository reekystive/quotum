import { getTrpcEndpointUrl } from '#src/constants.js';
import type { AppRouter } from '@quotum/app-quotum-server/shared-types';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

/**
 * Create tRPC client for the extension background script
 */
export const createTrpcClient = async () => {
  const trpcEndpointUrl = await getTrpcEndpointUrl();
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: trpcEndpointUrl,
        fetch: async (...args) => {
          return globalThis.fetch(...(args as Parameters<typeof globalThis.fetch>));
        },
      }),
    ],
  });
};
