import { signIn } from '#src/services/auth.ts';
import Head from 'next/head';
import { FC } from 'react';

const Page: FC = () => {
  return (
    <>
      <Head>
        <title>Continue to Subby</title>
      </Head>
      <form
        action={async () => {
          'use server';
          await signIn('github', { redirectTo: '/profile' });
        }}
      >
        <button type="submit">Continue with GitHub</button>
      </form>
    </>
  );
};

export default Page;
