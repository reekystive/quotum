import { createQuoteFromSelectionAndOpen } from '#src/commands/create-quote-and-open.js';
import { FC, useCallback } from 'react';
import browser from 'webextension-polyfill';
import { ensureContentScriptsInjected } from '../content-injection-background/ensure-injection.js';

export const App: FC = () => {
  const handleClickCreateQuote = useCallback(async () => {
    const tabId = await browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => tabs[0]?.id);
    if (!tabId) {
      return;
    }
    await ensureContentScriptsInjected(tabId);
    await createQuoteFromSelectionAndOpen(tabId);
  }, []);

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center overflow-clip`}>
      <button
        onClick={() => void handleClickCreateQuote()}
        className={`
          cursor-pointer rounded-sm border border-neutral-500/10 px-3 py-1 font-medium transition-colors duration-250
        `}
      >
        Create Quote
      </button>
    </div>
  );
};
