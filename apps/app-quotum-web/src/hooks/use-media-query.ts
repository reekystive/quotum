'use client';

import { useEffect, useMemo, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const mediaQuery = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.matchMedia(query);
  }, [query]);

  const [matches, setMatches] = useState(mediaQuery?.matches ?? false);

  useEffect(() => {
    if (!mediaQuery) {
      return;
    }
    setMatches(mediaQuery.matches);
    const handleChange = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mediaQuery]);

  return matches;
};
