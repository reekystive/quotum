import { runtimeMessageSchema } from '#src/schemas/runtime-message.js';

type OffscreenDocumentName = 'offscreen';

const offscreenDocuments: Record<OffscreenDocumentName, boolean> = {
  offscreen: false,
};

export async function ensureOffscreen(): Promise<void> {
  if (offscreenDocuments.offscreen) {
    console.log('[Quotum] offscreen document is already created, skipping creation');
    return;
  }

  void chrome.offscreen.createDocument({
    url: chrome.runtime.getURL('src/app/offscreen/index.html'),
    reasons: ['MATCH_MEDIA'],
    justification: 'Monitor prefers-color-scheme changes and update UI',
  });

  const creationSuccess = await Promise.race([
    new Promise((resolve) => {
      chrome.runtime.onMessage.addListener((rawMessage: unknown) => {
        const message = runtimeMessageSchema.parse(rawMessage);
        if (message.type === 'offscreen-ready') {
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

  if (!creationSuccess) {
    throw new Error('Failed to create offscreen document');
  }

  console.log('[Quotum] offscreen document is ready');
  offscreenDocuments.offscreen = true;
}
