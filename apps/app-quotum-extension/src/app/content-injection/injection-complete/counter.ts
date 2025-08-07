import { RuntimeMessage } from '#src/schemas/runtime-message.js';

// non-ui, shadow-root, non-shadow-root
let injectionCompleteCounter = 3;

export const completeInjection = () => {
  injectionCompleteCounter--;
  if (injectionCompleteCounter === 0) {
    console.log('[Quotum] injection complete');
    const message: RuntimeMessage = { type: 'injection-complete' };
    void chrome.runtime.sendMessage(message);
  }
};
