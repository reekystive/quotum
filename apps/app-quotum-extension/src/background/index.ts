import browser from 'webextension-polyfill';

console.log('[Quotum] Background script loaded');

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
    // Inject script to extract quote data from the page
    const [result] = await browser.scripting.executeScript({
      target: { tabId },
      func: () => {
        const selection = window.getSelection();
        if (!selection) {
          console.error('[Quotum] No selection available');
          return {
            status: 'error',
            message: 'No selection available',
          };
        }

        const result = globalThis.generateFragment(selection);
        if (result.status !== 'success' || !result.fragment) {
          console.error('[Quotum] No fragment generated');
          console.error(result);
          return {
            status: 'error',
            message: 'No fragment generated',
          };
        }

        const fragment = result.fragment;
        const prefix = fragment.prefix ? `${encodeURIComponent(fragment.prefix)}-,` : '';
        const suffix = fragment.suffix ? `,-${encodeURIComponent(fragment.suffix)}` : '';
        const textStart = encodeURIComponent(fragment.textStart ?? '');
        const textEnd = fragment.textEnd ? `,${encodeURIComponent(fragment.textEnd)}` : '';
        const urlWithTextAnchor = new URL(location.href);
        // https://example.com#:~:text=[prefix-,]textStart[,textEnd][,-suffix]
        urlWithTextAnchor.hash = `#:~:text=${prefix}${textStart}${textEnd}${suffix}`;

        console.log('[Quotum] Generated fragment:', urlWithTextAnchor.toString());

        return {
          status: 'success',
          url: urlWithTextAnchor.toString(),
        };
      },
    });

    console.log('[Quotum] Result:', result);
  } catch (error) {
    console.error('Error creating quote link:', error);
  }
}
