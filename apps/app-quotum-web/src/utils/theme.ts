import Cookies from 'js-cookie';
import { localStorageWithCache } from './local-storage.ts';

export const themes = ['light', 'dark', 'system'] as const;
export type SelectedTheme = (typeof themes)[number];
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeState {
  selectedTheme: SelectedTheme;
  resolvedTheme: ResolvedTheme;
}

const getClientSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') {
    throw new Error('getClientSystemTheme should not be called in server');
  }
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  return mediaQuery.matches ? 'dark' : 'light';
};

const resolveTheme = (selectedTheme: SelectedTheme, systemTheme: ResolvedTheme): ThemeState => {
  if (selectedTheme === 'system') {
    return {
      selectedTheme: 'system',
      resolvedTheme: systemTheme,
    };
  }
  return {
    selectedTheme,
    resolvedTheme: selectedTheme,
  };
};

const setThemeInCookie = (theme: SelectedTheme) => {
  if (typeof window === 'undefined') {
    return;
  }
  Cookies.set('theme', theme, { expires: 365 * 1000 });
};

export const setClientTheme = (theme: SelectedTheme): ThemeState => {
  const systemTheme = getClientSystemTheme();
  const themeState = resolveTheme(theme, systemTheme);
  window.document.documentElement.setAttribute('data-theme', themeState.resolvedTheme);
  localStorageWithCache.setItem('theme', theme);
  setThemeInCookie(themeState.selectedTheme);
  return themeState;
};

export const getClientTheme = (): ThemeState => {
  const systemTheme = getClientSystemTheme();
  const saved = localStorageWithCache.getItem('theme') ?? 'system';
  const themeState = resolveTheme(saved, systemTheme);
  return themeState;
};

export const initClientTheme = (): ThemeState => {
  const systemTheme = getClientSystemTheme();
  const saved = localStorageWithCache.getItem('theme') ?? 'system';
  setClientTheme(saved);
  const themeState = resolveTheme(saved, systemTheme);
  return themeState;
};
