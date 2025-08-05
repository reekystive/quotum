import type { ExtractedQuoteData } from './extract-quote-types.js';

export const extractSelectedQuoteFromPage = (): ExtractedQuoteData => {
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
    console.error('[Quotum] No fragment generated. result:', result);
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
    selectedText: selection.toString(),
    pageTitle: document.title,
    url: urlWithTextAnchor.toString(),
    textStart: fragment.textStart ?? '',
    textEnd: fragment.textEnd ?? '',
    prefix: fragment.prefix ?? '',
    suffix: fragment.suffix ?? '',
  };
};
