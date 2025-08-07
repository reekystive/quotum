import { injectGlobals } from './inject-globals.js';
import { listenSystemThemeChange } from './listen-system-theme-change.js';

export const injectContentScriptsForNonUi = () => {
  console.log('[Quotum] injecting content scripts for non-ui');

  injectGlobals();
  listenSystemThemeChange();
};
