import type { addTextAnchorToUrl } from '@quotum/utils';
import type {
  generateFragment,
  GenerateFragmentStatus,
} from '@quotum/vendor-wrapper/text-fragments-polyfill/fragment-generation-utils';
import type { toast } from 'sonner';

declare global {
  var fragmentGenerationUtils: {
    generateFragment: typeof generateFragment;
    GenerateFragmentStatus: typeof GenerateFragmentStatus;
  };
  var quotumUtils: {
    addTextAnchorToUrl: typeof addTextAnchorToUrl;
  };
  var sonnerUtils: {
    toast: typeof toast;
  };
}
