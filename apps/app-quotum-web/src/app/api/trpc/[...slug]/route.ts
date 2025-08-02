import { routes } from '#src/routes.ts';
import { appRouter } from '@quotum/app-trpc-server/shared';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

// @link https://nextjs.org/docs/app/api-reference/file-conventions/route
const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: routes.TRPC_ROUTE_PATH,
    router: appRouter,
    req,
    onError: (opts) => {
      const { error } = opts;
      console.error(error);
    },
  });
};

export const GET = handler;
export const HEAD = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS`
// and set the appropriate Response `Allow` header depending on the other
// methods defined in the Route Handler.

// export const OPTIONS = handler;
