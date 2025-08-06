import { SERVER_BASE_URL } from '#src/constants.js';
import { ExtractedQuoteDataSchema } from '#src/content/serializable-functions/extract-quote-types.js';
import { extractSelectedQuoteFromPage } from '#src/content/serializable-functions/extract-quote.js';
import { trpc } from '#src/services/trpc-client.js';
import browser from 'webextension-polyfill';

export const createQuoteFromSelectionAndOpen = async (tabId: number) => {
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
    anchorTextStart: data.textStart,
    anchorTextEnd: data.textEnd,
    anchorPrefix: data.prefix,
    anchorSuffix: data.suffix,
  });

  console.log('[Quotum] Quote created:', quote);

  if (quote?.id) {
    // Redirect to the quote page on the web app
    const quoteUrl = new URL(`${SERVER_BASE_URL}/q/${quote.id}`);
    await browser.tabs.create({ url: quoteUrl.toString() });
  }

  return quote;
};
