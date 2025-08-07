type OffscreenDocumentName = 'offscreen';

const offscreenDocuments: Record<OffscreenDocumentName, boolean> = {
  offscreen: false,
};

export async function ensureOffscreen(): Promise<void> {
  if (!offscreenDocuments.offscreen) {
    await chrome.offscreen.createDocument({
      url: chrome.runtime.getURL('src/app/offscreen/index.html'),
      reasons: ['MATCH_MEDIA'],
      justification: 'Monitor prefers-color-scheme changes and update UI',
    });
    offscreenDocuments.offscreen = true;
  }
}
