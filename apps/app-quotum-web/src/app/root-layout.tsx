import { FC, ReactNode } from 'react';

export const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
