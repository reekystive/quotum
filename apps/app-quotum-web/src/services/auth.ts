import { getCloudflareContext } from '@opennextjs/cloudflare';
import NextAuth, { NextAuthResult } from 'next-auth';
import GitHub from 'next-auth/providers/github';

const nextAuth = NextAuth(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return {
    providers: [
      GitHub({
        clientSecret: env.AUTH_GITHUB_SECRET,
        clientId: env.AUTH_GITHUB_ID,
      }),
    ],
    secret: env.AUTH_SECRET,
    trustHost: true,
  };
});

export const auth: NextAuthResult['auth'] = nextAuth.auth;
export const signIn: NextAuthResult['signIn'] = nextAuth.signIn;
export const signOut: NextAuthResult['signOut'] = nextAuth.signOut;
export const handlers: NextAuthResult['handlers'] = nextAuth.handlers;
