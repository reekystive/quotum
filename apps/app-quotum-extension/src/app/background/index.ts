import { createQuoteFromSelectionAndOpen } from '#src/services/create-quote-and-open.js';
import browser from 'webextension-polyfill';
import { handleSystemThemeChange } from './handle-system-theme-change.js';

console.log('[Quotum] Background script loaded');

handleSystemThemeChange();

// Initialize context menu on extension install
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: 'create-quote-link',
    title: 'Create Quote Link',
    contexts: ['selection'],
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'create-quote-link': {
      if (!tab?.id) return;
      void handleCreateQuoteLinkNew(tab.id);
      break;
    }
    default: {
      console.error(`Unknown menu item id: ${info.menuItemId}`);
      break;
    }
  }
});

// Handle context menu clicks
async function handleCreateQuoteLinkNew(tabId: number): Promise<void> {
  try {
    await createQuoteFromSelectionAndOpen(tabId);
  } catch (error) {
    console.error('Error creating quote link:', error);
  }
}
