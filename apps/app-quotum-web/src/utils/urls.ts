import { routes } from '#src/routes.ts';
import { isCSR } from '#src/utils/ssr.ts';
import { getCloudflareContext } from '@opennextjs/cloudflare';

const getServerBaseUrl = async (): Promise<string> => {
  const cloudflare = await getCloudflareContext({ async: true });
  return cloudflare.env.SERVER_BASE_URL;
};

// Safely get baseUrl to avoid window error during SSR
const getTRPCUrl = async (): Promise<URL> => {
  if (isCSR()) {
    return new URL(routes.TRPC_ROUTE_PATH, window.location.origin);
  }
  // In server environment, use environment variable or default value
  // TODO: use the correct URL
  return new URL(routes.TRPC_ROUTE_PATH, await getServerBaseUrl());
};

export const trpcEndpoint = await getTRPCUrl();
