import { auth } from '#src/services/auth.ts';
import Head from 'next/head';
import { FC } from 'react';

const Page: FC = async () => {
  const session = await auth();
  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
      <Head>
        <title>{session.user?.name ?? 'Profile'} - Subby</title>
      </Head>
      <div className="min-h-(--main-height) flex w-full flex-col items-center justify-center gap-2 p-2">
        <h1>Hello {session.user?.name}</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  );
};

export default Page;
