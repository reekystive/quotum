import { FC, useEffect } from 'react';
import { Toaster } from 'sonner';
import { completeInjection } from '../../injection-complete/counter.js';

export const NonShadowRoot: FC = () => {
  useEffect(() => {
    completeInjection();
  }, []);

  return (
    <>
      <Toaster theme="system" position="top-right" />;
    </>
  );
};
