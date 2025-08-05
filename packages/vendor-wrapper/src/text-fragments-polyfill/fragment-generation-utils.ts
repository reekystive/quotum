import { generateFragment as rawGenerateFragment } from 'text-fragments-polyfill/fragment-generation-utils';
import { TextFragment } from './text-fragment-utils.js';

export enum GenerateFragmentStatus {
  SUCCESS = 0,
  INVALID_SELECTION = 1,
  AMBIGUOUS = 2,
  TIMEOUT = 3,
  EXECUTION_FAILED = 4,
}

export interface GenerateFragmentResult {
  status: GenerateFragmentStatus;
  fragment?: TextFragment;
}

/**
 * Attempts to generate a fragment, suitable for formatting and including in a
 * URL, which will highlight the given selection upon opening.
 * @param selection - a Selection object, the result of
 *     window.getSelection
 */
export const generateFragment: (selection: Selection) => GenerateFragmentResult = (...args) => {
  return rawGenerateFragment(...args) as unknown as GenerateFragmentResult;
};
