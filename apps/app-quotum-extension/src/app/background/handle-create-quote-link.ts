import { createQuoteFromSelectionAndOpen } from '#src/commands/create-quote-and-open.js';
import browser from 'webextension-polyfill';

// Handle context menu clicks
export async function handleCreateQuoteLink(tabId: number): Promise<void> {
  try {
    void browser.scripting.executeScript({
      target: { tabId },
      func: () => {
        console.log('Creating quote link...');
        globalThis.injected.sonnerUtils.toast.loading('Creating quote link...');
      },
    });

    const quote = await createQuoteFromSelectionAndOpen(tabId);
    console.log('Quote created:', quote);

    void browser.scripting.executeScript({
      target: { tabId },
      func: (quoteUrl: string) => {
        console.log(`Quote created with url ${quoteUrl}. Redirecting to quote page...`);
        globalThis.injected.sonnerUtils.toast.dismiss();
        globalThis.injected.sonnerUtils.toastQuoteCreated(quoteUrl);
      },
      args: [quote.quoteUrl],
    });
  } catch (error) {
    console.error('Error creating quote link:', error);
    void browser.scripting.executeScript({
      target: { tabId },
      func: () => {
        globalThis.injected.sonnerUtils.toast.dismiss();
        globalThis.injected.sonnerUtils.toast.error('Error creating quote link');
      },
    });
  }
}
