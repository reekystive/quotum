import { initClientTheme } from '#src/utils/theme.ts';

export const clientInit = () => {
  if (typeof window !== 'undefined') {
    initClientTheme();
  }
};
