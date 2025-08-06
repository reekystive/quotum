import { addTextAnchorToUrl } from '@quotum/utils';
import {
  generateFragment,
  GenerateFragmentStatus,
} from '@quotum/vendor-wrapper/text-fragments-polyfill/fragment-generation-utils';

export const injectGlobals = (): void => {
  globalThis.fragmentGenerationUtils = {
    generateFragment,
    GenerateFragmentStatus,
  };
  globalThis.quotumUtils = {
    addTextAnchorToUrl,
  };
};
