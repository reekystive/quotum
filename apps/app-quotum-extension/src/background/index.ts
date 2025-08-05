import { ExtractedQuoteDataSchema } from '#src/content/functions/extract-quote-types.js';
import { extractSelectedQuoteFromPage } from '#src/content/functions/extract-quote.js';
import { trpc } from '#src/services/trpc-client.js';
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
      func: extractSelectedQuoteFromPage,
    });

    console.log('[Quotum] Result:', result);

    // Validate the extracted data using Zod schema
    const parsedResult = ExtractedQuoteDataSchema.safeParse(result?.result);

    if (!parsedResult.success) {
      console.error('[Quotum] Invalid extracted data:', parsedResult.error);
      return;
    }

    const data = parsedResult.data;

    if (data.status === 'error') {
      console.error('[Quotum] Error extracting quote:', data.message);
      return;
    }

    // Create the quote using the TRPC client
    const quote = await trpc.quoteCreate.mutate({
      content: data.selectedText,
      title: data.pageTitle,
      url: data.url,
    });

    console.log('[Quotum] Quote created:', quote);
    if (quote?.id) {
      // Redirect to the quote page on the web app
      const quoteUrl = new URL(`https://quotum.me/q/${quote.id}`);
      await browser.tabs.create({ url: quoteUrl.toString() });
    }
  } catch (error) {
    console.error('Error creating quote link:', error);
  }
}
