import browser from 'webextension-polyfill';
import { ensureContentScriptsInjected } from '../content-injection-background/ensure-injection.js';
import { ensureOffscreen } from './ensure-offscreen.js';
import { handleCreateQuoteLink } from './handle-create-quote-link.js';
import { handleSystemThemeChange } from './handle-system-theme-change.js';

console.log('[Quotum] Background script loaded');

// Initialize context menu on extension install
// eslint-disable-next-line @typescript-eslint/no-misused-promises
browser.runtime.onInstalled.addListener(async () => {
  browser.contextMenus.create({
    id: 'create-quote-link',
    title: 'Create Quote Link',
    contexts: ['selection'],
  });
  // Listen for system theme changes
  await ensureOffscreen();
  handleSystemThemeChange();
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;
  await ensureContentScriptsInjected(tab.id);

  switch (info.menuItemId) {
    case 'create-quote-link': {
      void handleCreateQuoteLink(tab.id);
      break;
    }
    default: {
      console.error(`Unknown menu item id: ${info.menuItemId}`);
      break;
    }
  }
});
