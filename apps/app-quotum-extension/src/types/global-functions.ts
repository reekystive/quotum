import type {
  generateFragment,
  GenerateFragmentStatus,
} from '@quotum/vendor-wrapper/text-fragments-polyfill/fragment-generation-utils';

declare global {
  var fragmentGenerationUtils: {
    generateFragment: typeof generateFragment;
    GenerateFragmentStatus: typeof GenerateFragmentStatus;
  };
}
