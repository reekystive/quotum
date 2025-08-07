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
  let currentTheme: 'light' | 'dark' = darkMedia.matches ? 'dark' : 'light';

  // change event is not fired when offscreen document is not opened in the browser tab by user
  // so a interval is used to monitor the theme change
  darkMedia.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    if (newTheme !== currentTheme) {
      currentTheme = newTheme;
      console.log('[Quotum] detected media change in event listener, newTheme:', newTheme);
      sendSystemThemeChangeMessage(newTheme);
    }
  });

  const initialTheme = darkMedia.matches ? 'dark' : 'light';
  console.log('[Quotum] sending initial theme:', initialTheme);
  sendSystemThemeChangeMessage(initialTheme);

  setInterval(() => {
    const newTheme = darkMedia.matches ? 'dark' : 'light';
    if (newTheme !== currentTheme) {
      currentTheme = newTheme;
      console.log('[Quotum] detected media change in interval, newTheme:', newTheme);
      sendSystemThemeChangeMessage(newTheme);
    }
  }, 1000);
};
