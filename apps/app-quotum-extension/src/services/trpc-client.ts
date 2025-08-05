import { TRPC_ENDPOINT_URL } from '#src/constants.js';
import type { AppRouter } from '@quotum/app-quotum-server/shared-types';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

/**
 * Create tRPC client for the extension background script
 */
export const createTrpcClient = () => {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: TRPC_ENDPOINT_URL,
        fetch: async (...args) => {
          return globalThis.fetch(...(args as Parameters<typeof globalThis.fetch>));
        },
      }),
    ],
  });
};

export const trpc = createTrpcClient();
