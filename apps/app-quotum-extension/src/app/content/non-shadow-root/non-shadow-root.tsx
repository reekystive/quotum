import { FC } from 'react';
import { Toaster } from 'sonner';

export const NonShadowRoot: FC = () => {
  return (
    <>
      <Toaster theme="system" position="top-right" />;
    </>
  );
};
