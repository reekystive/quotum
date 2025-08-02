import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';

// calling the synchronous getCloudflareContext at the root level isn't permitted
// https://github.com/opennextjs/opennextjs-cloudflare/issues/575
export const getD1Database = async () => {
  const cloudflare = await getCloudflareContext({ async: true });
  return drizzle(cloudflare.env.D1);
};
