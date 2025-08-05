import type { generateFragment } from '#src/vendor-google/fragment-generation-utils.js';

type GenerateFragment = typeof generateFragment;

declare global {
  var generateFragment: GenerateFragment;
}
