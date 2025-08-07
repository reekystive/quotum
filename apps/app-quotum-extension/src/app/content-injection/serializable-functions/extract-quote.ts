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

  const result = globalThis.injected.fragmentGenerationUtils.generateFragment(selection);
  if (
    result.status !== globalThis.injected.fragmentGenerationUtils.GenerateFragmentStatus.SUCCESS ||
    !result.fragment
  ) {
    console.error('[Quotum] No fragment generated. result:', result);
    return {
      status: 'error',
      message: 'No fragment generated',
    };
  }

  const fragment = result.fragment;

  // https://example.com#:~:text=[prefix-,]textStart[,textEnd][,-suffix]
  const urlWithTextAnchor = globalThis.injected.quotumUtils.addTextAnchorToUrl({
    url: new URL(location.href),
    anchorTextStart: fragment.textStart,
    anchorTextEnd: fragment.textEnd,
    anchorPrefix: fragment.prefix,
    anchorSuffix: fragment.suffix,
  });

  console.log('[Quotum] Generated fragment:', urlWithTextAnchor.toString());

  return {
    status: 'success',
    selectedText: selection.toString(),
    pageTitle: document.title,
    url: urlWithTextAnchor.toString(),
    textStart: fragment.textStart,
    textEnd: fragment.textEnd,
    prefix: fragment.prefix,
    suffix: fragment.suffix,
  };
};
