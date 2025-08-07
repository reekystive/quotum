import { injectGlobals } from './inject-globals.js';

export const injectContentScriptsForNonUi = () => {
  console.log('[Quotum] injecting content scripts for non-ui');
  injectGlobals();
};
