import type { addTextAnchorToUrl } from '@quotum/utils';
import type {
  generateFragment,
  GenerateFragmentStatus,
} from '@quotum/vendor-wrapper/text-fragments-polyfill/fragment-generation-utils';
import type { toast } from 'sonner';

declare global {
  var injected: {
    fragmentGenerationUtils: {
      generateFragment: typeof generateFragment;
      GenerateFragmentStatus: typeof GenerateFragmentStatus;
    };
    quotumUtils: {
      addTextAnchorToUrl: typeof addTextAnchorToUrl;
    };
    sonnerUtils: {
      toast: typeof toast;
      toastQuoteCreated: (quoteUrl: string) => void;
    };
  };
}

export type Injected = typeof globalThis.injected;
