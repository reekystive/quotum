import { useMediaQuery } from '@react-hookz/web';
import { FC } from 'react';
import { Toaster } from 'sonner';

export const App: FC = () => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)') ?? true;

  return (
    <>
      <Toaster theme={isDarkMode ? 'dark' : 'light'} />
    </>
  );
};
