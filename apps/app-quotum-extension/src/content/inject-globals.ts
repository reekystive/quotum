import { generateFragment } from '#src/vendor-google/fragment-generation-utils.js';

export const injectGlobals = (): void => {
  globalThis.generateFragment = generateFragment;
};
