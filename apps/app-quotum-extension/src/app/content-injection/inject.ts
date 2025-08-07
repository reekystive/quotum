import { injectContentScriptsForUi } from './injection-ui/inject-ui.js';
import { injectContentScriptsForNonUi } from './injection/inject.js';

const injectContentScripts = () => {
  console.log('[Quotum] injecting content scripts');
  injectContentScriptsForNonUi();
  injectContentScriptsForUi();
  globalThis.contentScriptsInjected = true;
};

injectContentScripts();
