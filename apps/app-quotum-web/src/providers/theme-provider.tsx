'use client';

import { useEventCallback } from '#src/hooks/use-event-callback.ts';
import { useMediaQuery } from '#src/hooks/use-media-query.ts';
import { getClientTheme, ResolvedTheme, SelectedTheme, setClientTheme } from '#src/utils/theme.ts';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const useThemeValues = (props: { themeFromCookie: SelectedTheme | null }) => {
  const { themeFromCookie } = props;

  const isClientSystemThemeDark = useMediaQuery('(prefers-color-scheme: dark)');

  const [themeState, setThemeState] = useState<{
    resolvedTheme: ResolvedTheme | null;
    selectedTheme: SelectedTheme;
  }>(() => {
    if (typeof window === 'undefined') {
      return {
        selectedTheme: themeFromCookie ?? 'system',
        resolvedTheme: themeFromCookie === 'system' ? null : themeFromCookie,
      };
    }
    const clientTheme = getClientTheme();
    return {
      selectedTheme: clientTheme.selectedTheme,
      resolvedTheme: clientTheme.selectedTheme === 'system' ? null : clientTheme.selectedTheme,
    };
  });

  // 1. update theme after hydration
  // 2. update theme on system theme change
  const syncSystemTheme = useEventCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const currentTheme = getClientTheme();
    const newTheme = setClientTheme(currentTheme.selectedTheme);
    setThemeState(newTheme);
  });

  useEffect(() => {
    syncSystemTheme();
  }, [isClientSystemThemeDark, syncSystemTheme]);

  const setTheme = useEventCallback((theme: SelectedTheme) => {
    if (typeof window === 'undefined') {
      return;
    }
    const newTheme = setClientTheme(theme);
    setThemeState(newTheme);
  });

  return {
    theme: themeState.selectedTheme,
    resolvedTheme: themeState.resolvedTheme,
    setTheme,
  };
};

const ThemeContext = createContext<ReturnType<typeof useThemeValues> | null>(null);

export const ThemeProvider = ({
  themeFromCookie,
  children,
}: {
  themeFromCookie: SelectedTheme | null;
  children: ReactNode;
}) => {
  const value = useThemeValues({ themeFromCookie });
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('ThemeProvider not found');
  }
  return theme;
};
