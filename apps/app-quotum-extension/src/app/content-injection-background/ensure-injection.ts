// run in background scripts

import { runtimeMessageSchema } from '#src/schemas/runtime-message.js';
import browser from 'webextension-polyfill';
import injectScriptPath from '../content-injection/inject.ts?script';

export const ensureContentScriptsInjected = async (tabId: number) => {
  console.log('[Quotum] ensuring content scripts injected');

  const [alreadyInjected] = await browser.scripting.executeScript({
    target: { tabId },
    func: () => {
      return globalThis.contentScriptsInjected === true;
    },
  });

  if (alreadyInjected?.result === true) {
    console.log('[Quotum] content scripts already injected, skipping injection');
    return;
  }

  console.log('[Quotum] injecting content scripts to tab', tabId);
  console.log(
    `[Quotum] chrome.scripting.executeScript({ target: { tabId: ${tabId} }, files: [ '${injectScriptPath}' ] })`
  );

  void browser.scripting.executeScript({
    target: { tabId },
    files: [injectScriptPath],
  });

  const injectionComplete = await Promise.race([
    new Promise((resolve) => {
      browser.runtime.onMessage.addListener((rawMessage: unknown) => {
        const message = runtimeMessageSchema.parse(rawMessage);
        if (message.type === 'injection-complete') {
          resolve(true);
        }
      });
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 5 * 1000);
    }),
  ]);

  if (!injectionComplete) {
    console.error('[Quotum] injection timed out');
    throw new Error('Injection timed out');
  }
};
