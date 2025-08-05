/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'text-fragments-polyfill/text-fragment-utils' {
  /**
   * Text fragments CSS class name.
   */
  export const TEXT_FRAGMENT_CSS_CLASS_NAME: 'text-fragments-polyfill-target-text';
  export function getFragmentDirectives(hash: string): {
    text: string[];
  };
  export function parseFragmentDirectives(fragmentDirectives: { text: string[] }): {
    text: TextFragment[];
  };
  export function processFragmentDirectives(
    parsedFragmentDirectives: {
      text: TextFragment[];
    },
    documentToProcess?: Document,
    root?: Element
  ): {
    text: Element[];
  };
  export function processTextFragmentDirective(
    textFragment: TextFragment,
    documentToProcess?: Document,
    root?: Element
  ): Range[];
  export function removeMarks(marks: Node[], documentToProcess?: Document): void;
  export function markRange(range: Range, documentToProcess?: Document): Element[];
  export function scrollElementIntoView(element: Element): void;
  export namespace forTesting {
    export { advanceRangeStartPastOffset };
    export { advanceRangeStartToNonWhitespace };
    export { findRangeFromNodeList };
    export { findTextInRange };
    export { getBoundaryPointAtIndex };
    export { isWordBounded };
    export { makeNewSegmenter };
    export { markRange };
    export { normalizeString };
    export { parseTextFragmentDirective };
    export { forwardTraverse };
    export { backwardTraverse };
    export { getAllTextNodes };
    export { acceptTextNodeIfVisibleInRange };
  }
  export namespace internal {
    export { BLOCK_ELEMENTS };
    export { BOUNDARY_CHARS };
    export { NON_BOUNDARY_CHARS };
    export { acceptNodeIfVisibleInRange };
    export { normalizeString };
    export { makeNewSegmenter };
    export { forwardTraverse };
    export { backwardTraverse };
    export { makeTextNodeWalker };
    export { isNodeVisible };
  }
  export function applyTargetTextStyle(): void;
  export function setDefaultTextFragmentsStyle({
    backgroundColor,
    color,
  }: {
    backgroundColor: string;
    color: string;
  }): void;
  export type ElementFilterFunction = (element: HTMLElement) => number;
  export interface TextFragment {
    textStart: string;
    textEnd?: string | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
  }
  /**
   * Provides the data needed for calling setStart/setEnd on a Range.
   */
  export interface BoundaryPoint {
    node: Node;
    offset: number;
  }
  /**
   * Sets the start of |range| to be the first boundary point after |offset| in
   * |node|--either at offset+1, or after the node.
   * @param {Range} range - the range to mutate
   * @param {Node} node - the node used to determine the new range start
   * @param {number} offset - the offset immediately before the desired new
   *     boundary point
   */
  function advanceRangeStartPastOffset(range: Range, node: Node, offset: number): void;
  /**
   * Modifies |range| to start at the next non-whitespace position.
   * @param {Range} range - the range to mutate
   */
  function advanceRangeStartToNonWhitespace(range: Range): void;
  /**
   * Finds a range pointing to the first instance of |query| within |range|,
   * searching over the text contained in a list |nodeList| of relevant textNodes.
   * @param {string} query - the string to find
   * @param {Range} range - the range in which to search
   * @param {Node[]} textNodes - the visible text nodes within |range|
   * @param {Intl.Segmenter} [segmenter] - a segmenter to be used for finding word
   *     boundaries, if supported
   * @return {Range} - the found range, or undefined if no such range could be
   *     found
   */
  function findRangeFromNodeList(query: string, range: Range, textNodes: Node[], segmenter?: Intl.Segmenter): Range;
  /**
   * Returns a range pointing to the first instance of |query| within |range|.
   * @param {string} query - the string to find
   * @param {Range} range - the range in which to search
   * @return {Range|Undefined} - The first found instance of |query| within
   *     |range|.
   */
  function findTextInRange(query: string, range: Range): Range | undefined;
  /**
   * Generates a boundary point pointing to the given text position.
   * @param {number} index - the text offset indicating the start/end of a
   *     substring of the concatenated, normalized text in |textNodes|
   * @param {Node[]} textNodes - the text Nodes whose contents make up the search
   *     space
   * @param {boolean} isEnd - indicates whether the offset is the start or end of the
   *     substring
   * @return {BoundaryPoint} - a boundary point suitable for setting as the start
   *     or end of a Range, or undefined if it couldn't be computed.
   */
  function getBoundaryPointAtIndex(index: number, textNodes: Node[], isEnd: boolean): BoundaryPoint;
  /**
   * Checks if a substring is word-bounded in the context of a longer string.
   *
   * If an Intl.Segmenter is provided for locale-specific segmenting, it will be
   * used for this check. This is the most desirable option, but not supported in
   * all browsers.
   *
   * If one is not provided, a heuristic will be applied,
   * returning true iff:
   *  - startPos == 0 OR char before start is a boundary char, AND
   *  - length indicates end of string OR char after end is a boundary char
   * Where boundary chars are whitespace/punctuation defined in the const above.
   * This causes the known issue that some languages, notably Japanese, only match
   * at the level of roughly a full clause or sentence, rather than a word.
   *
   * @param {string} text - the text to search
   * @param {number} startPos - the index of the start of the substring
   * @param {number} length - the length of the substring
   * @param {Intl.Segmenter} [segmenter] - a segmenter to be used for finding word
   *     boundaries, if supported
   * @return {boolean} - true iff startPos and length point to a word-bounded
   *     substring of |text|.
   */
  function isWordBounded(text: string, startPos: number, length: number, segmenter?: Intl.Segmenter): boolean;
  /**
   * @return {Intl.Segmenter|undefined} - a segmenter object suitable for finding
   *     word boundaries. Returns undefined on browsers/platforms that do not yet
   *     support the Intl.Segmenter API.
   */
  function makeNewSegmenter(): Intl.Segmenter | undefined;
  /**
   * @param {string} str - a string to be normalized
   * @return {string} - a normalized version of |str| with all consecutive
   *     whitespace chars converted to a single ' ' and all diacriticals removed
   *     (e.g., 'é' -> 'e').
   */
  function normalizeString(str: string): string;
  /**
   * Decompose a string into an object containing all the parts of a text
   * fragment.
   * @param {string} textFragment - String to decompose.
   * @return {TextFragment} Object containing textStart, textEnd, prefix and
   *     suffix of the text fragment.
   */
  function parseTextFragmentDirective(textFragment: string): TextFragment;
  /**
   * Performs traversal on a TreeWalker, visiting each subtree in document order.
   * When visiting a subtree not already visited (its root not in finishedSubtrees
   * ), first the root is emitted then the subtree is traversed, then the root is
   * emitted again and then the next subtree in document order is visited.
   *
   * Subtree's roots are emitted twice to signal the beginning and ending of
   * element nodes. This is useful for ensuring the ends of block boundaries are
   * found.
   * @param {TreeWalker} walker - the TreeWalker to be traversed
   * @param {Set} finishedSubtrees - set of subtree roots already visited
   * @return {Node} - next node in the traversal
   */
  function forwardTraverse(walker: TreeWalker, finishedSubtrees: Set<any>): Node;
  /**
   * Performs backwards traversal on a TreeWalker, visiting each subtree in
   * backwards document order. When visiting a subtree not already visited (its
   * root not in finishedSubtrees ), first the root is emitted then the subtree is
   * backward traversed, then the root is emitted again and then the previous
   * subtree in document order is visited.
   *
   * Subtree's roots are emitted twice to signal the beginning and ending of
   * element nodes. This is useful for ensuring  block boundaries are found.
   * @param {TreeWalker} walker - the TreeWalker to be traversed
   * @param {Set} finishedSubtrees - set of subtree roots already visited
   * @return {Node} - next node in the backwards traversal
   */
  function backwardTraverse(walker: TreeWalker, finishedSubtrees: Set<any>): Node;
  /**
   * Extracts all the text nodes within the given range.
   * @param {Node} root - the root node in which to search
   * @param {Range} range - a range restricting the scope of extraction
   * @return {Array<string[]>} - a list of lists of text nodes, in document order.
   *     Lists represent block boundaries; i.e., two nodes appear in the same list
   *     iff there are no block element starts or ends in between them.
   */
  function getAllTextNodes(root: Node, range: Range): string[][];
  /**
   * Filter function for use with TreeWalkers. Accepts only visible text nodes
   * that are in the given range. Other types of nodes visible in the given range
   * are skipped so a TreeWalker using this filter function still visits text
   * nodes in the node's subtree.
   * @param {Node} node - the Node to evaluate
   * @param {Range} range - the range in which node must fall. Optional;
   *     if null, the range check is skipped/
   * @return {NodeFilter} - NodeFilter value to be passed along to a TreeWalker.
   * Values returned:
   *  - FILTER_REJECT: Node not in range or not visible.
   *  - FILTER_SKIP: Non Text Node visible and in range
   *  - FILTER_ACCEPT: Text Node visible and in range
   */
  function acceptTextNodeIfVisibleInRange(node: Node, range: Range): NodeFilter;
  const BLOCK_ELEMENTS: string[];
  const BOUNDARY_CHARS: RegExp;
  const NON_BOUNDARY_CHARS: RegExp;
  /**
   * Filter function for use with TreeWalkers. Rejects nodes that aren't in the
   * given range or aren't visible.
   * @param {Node} node - the Node to evaluate
   * @param {Range|Undefined} range - the range in which node must fall. Optional;
   *     if null, the range check is skipped.
   * @return {NodeFilter} - FILTER_ACCEPT or FILTER_REJECT, to be passed along to
   *     a TreeWalker.
   */
  function acceptNodeIfVisibleInRange(node: Node, range: Range | undefined): NodeFilter;
  /**
   * Creates a TreeWalker that traverses a range and emits visible text nodes in
   * the range.
   * @param {Range} range - Range to be traversed by the walker
   * @return {TreeWalker}
   */
  function makeTextNodeWalker(range: Range): TreeWalker;
  /**
   * Helper function to calculate the visibility of a Node based on its CSS
   * computed style. This function does not take into account the visibility of
   * the node's ancestors so even if the node is visible according to its style
   * it might not be visible on the page if one of its ancestors is not visible.
   * @param {Node} node - the Node to evaluate
   * @return {boolean} - true if the node is visible. A node will be visible if
   * its computed style meets all of the following criteria:
   *  - non zero height, width, height and opacity
   *  - visibility not hidden
   *  - display not none
   */
  function isNodeVisible(node: Node): boolean;
}
