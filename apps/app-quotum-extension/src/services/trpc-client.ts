import type { AppRouter } from '@quotum/app-quotum-server/shared-types';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

// Configuration for the server endpoint
const SERVER_BASE_URL = 'https://quotum.me'; // TODO: Configure this properly
const TRPC_ENDPOINT = `${SERVER_BASE_URL}/api/trpc`;

/**
 * Create tRPC client for the extension background script
 */
export const createTrpcClient = () => {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: TRPC_ENDPOINT,
        fetch: async (...args) => {
          return globalThis.fetch(...(args as Parameters<typeof globalThis.fetch>));
        },
      }),
    ],
  });
};

export const trpc = createTrpcClient();
