import { z } from 'zod';

const localStorageDataSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  locale: z.enum(['en', 'zh']),
});

type LocalStorageData = z.infer<typeof localStorageDataSchema>;
type LocalStorageKey = keyof LocalStorageData;

class LocalStorageWithCache {
  private cache = new Map<string, string>();

  private isValidKey(key: string): key is keyof LocalStorageData {
    return key in localStorageDataSchema.shape;
  }

  getItem<K extends LocalStorageKey>(key: K): LocalStorageData[K] | null {
    if (typeof window === 'undefined') {
      return null;
    }
    if (!this.isValidKey(key)) {
      return null;
    }
    const cached = this.cache.get(key);
    if (cached !== undefined) {
      return cached as LocalStorageData[K];
    }
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return null;
    }
    const parsed = localStorageDataSchema.shape[key].safeParse(raw);
    if (!parsed.success) {
      return null;
    }
    this.cache.set(key, parsed.data);
    return parsed.data as LocalStorageData[K];
  }

  setItem<K extends LocalStorageKey>(key: K, value: LocalStorageData[K]): void {
    if (typeof window === 'undefined') {
      return;
    }
    if (!this.isValidKey(key)) {
      return;
    }
    const parsed = localStorageDataSchema.shape[key].safeParse(value);
    if (!parsed.success) {
      return;
    }
    localStorage.setItem(key, parsed.data);
    this.cache.set(key, parsed.data);
  }

  removeItem(key: LocalStorageKey): void {
    if (typeof window === 'undefined') {
      return;
    }
    if (!this.isValidKey(key)) {
      return;
    }
    localStorage.removeItem(key);
    this.cache.delete(key);
  }
}

export const localStorageWithCache = new LocalStorageWithCache();
