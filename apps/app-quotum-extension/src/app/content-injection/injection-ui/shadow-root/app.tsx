import { FC, useEffect } from 'react';
import { completeInjection } from '../../injection-complete/counter.js';

export const App: FC = () => {
  useEffect(() => {
    completeInjection();
  }, []);
  return null;
};
