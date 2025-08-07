import { createQuoteFromSelectionAndOpen } from '#src/commands/create-quote-and-open.js';
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
    void browser.scripting.executeScript({
      target: { tabId },
      func: () => {
        console.log('Creating quote link...');
        globalThis.sonnerUtils.toast.loading('Creating quote link...');
      },
    });

    const quote = await createQuoteFromSelectionAndOpen(tabId);
    console.log('Quote created:', quote);

    void browser.scripting.executeScript({
      target: { tabId },
      func: (quoteId: string) => {
        console.log(`Quote ${quoteId} created. Redirecting to quote page...`);
        globalThis.sonnerUtils.toast.dismiss();
        globalThis.sonnerUtils.toast.success(`Quote created! Redirecting to quote page...`);
      },
      args: [quote?.id],
    });
  } catch (error) {
    console.error('Error creating quote link:', error);
    void browser.scripting.executeScript({
      target: { tabId },
      func: () => {
        globalThis.sonnerUtils.toast.dismiss();
        globalThis.sonnerUtils.toast.error('Error creating quote link');
      },
    });
  }
}
