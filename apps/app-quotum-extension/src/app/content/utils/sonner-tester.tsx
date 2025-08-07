import { useIntervalEffect } from '@react-hookz/web';
import { FC } from 'react';

export const SonnerTester: FC = () => {
  useIntervalEffect(() => {
    console.log('Creating toast from sonner tester content script');
    globalThis.sonnerUtils.toast.info('Greeting from sonner tester content script');
  }, 1000);
  return null;
};
