import { cookies } from 'next/headers';
import z from 'zod';
import { SelectedTheme, themes } from './theme.ts';

export const getThemeFromServerCookie = async (): Promise<SelectedTheme | null> => {
  if (typeof window !== 'undefined') {
    throw new Error('getCurrentThemeFromCookie should not be called in client');
  }
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');
  if (!theme) {
    return 'system';
  }
  const parsed = z.enum(themes).safeParse(theme.value);
  if (!parsed.success) {
    return null;
  }
  return parsed.data;
};
