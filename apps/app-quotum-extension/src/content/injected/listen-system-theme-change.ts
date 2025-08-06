import { SystemThemeChangeMessage } from '#src/schemas/runtime-message.js';
import browser from 'webextension-polyfill';

const sendSystemThemeChangeMessage = (theme: 'light' | 'dark') => {
  const message: SystemThemeChangeMessage = {
    type: 'system-theme-change',
    theme,
  };
  void browser.runtime.sendMessage(message);
};

export const listenSystemThemeChange = () => {
  const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
  darkMedia.addEventListener('change', (e) => {
    console.log('[Quotum] detected media change, darkMedia.matches:', e.matches);
    sendSystemThemeChangeMessage(e.matches ? 'dark' : 'light');
  });
  const initialTheme = darkMedia.matches ? 'dark' : 'light';
  console.log('[Quotum] sending initial theme:', initialTheme);
  sendSystemThemeChangeMessage(initialTheme);
};
