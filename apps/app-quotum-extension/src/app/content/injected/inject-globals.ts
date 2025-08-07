import { addTextAnchorToUrl } from '@quotum/utils';
import {
  generateFragment,
  GenerateFragmentStatus,
} from '@quotum/vendor-wrapper/text-fragments-polyfill/fragment-generation-utils';
import { toast } from 'sonner';
import { toastQuoteCreated } from './sonner-toasts.js';

export const injectGlobals = (): void => {
  globalThis.fragmentGenerationUtils = {
    generateFragment,
    GenerateFragmentStatus,
  };
  globalThis.quotumUtils = {
    addTextAnchorToUrl,
  };
  globalThis.sonnerUtils = {
    toast,
    toastQuoteCreated,
  };
};
