import { runtimeMessageSchema } from '#src/schemas/runtime-message.js';
import browser from 'webextension-polyfill';

const setIconForTheme = (theme: 'light' | 'dark') => {
  void browser.action.setIcon({
    path: {
      48: `icon-${theme}.png`,
    },
  });
};

const updateTheme = (theme: 'light' | 'dark') => {
  setIconForTheme(theme);
};

export const handleSystemThemeChange = () => {
  browser.runtime.onMessage.addListener((rawMessage: unknown) => {
    const message = runtimeMessageSchema.parse(rawMessage);
    if (message.type !== 'system-theme-change') {
      return;
    }
    console.log('[Quotum] received system theme change message', message);
    updateTheme(message.theme);
  });
};
