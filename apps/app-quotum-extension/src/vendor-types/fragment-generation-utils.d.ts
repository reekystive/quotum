/* eslint-disable @typescript-eslint/no-explicit-any */

type TextFragment = import('text-fragments-polyfill/text-fragment-utils').TextFragment;

declare module 'text-fragments-polyfill/fragment-generation-utils' {
  export function setTimeout(newTimeoutDurationMs: number): void;
  export namespace GenerateFragmentStatus {
    let SUCCESS: number;
    let INVALID_SELECTION: number;
    let AMBIGUOUS: number;
    let TIMEOUT: number;
    let EXECUTION_FAILED: number;
  }
  export function generateFragment(selection: Selection, startTime?: Date): GenerateFragmentResult;
  export function generateFragmentFromRange(range: Range, startTime?: Date): GenerateFragmentResult;
  export function isValidRangeForFragmentGeneration(range: Range): boolean;
  export namespace forTesting {
    export { containsBlockBoundary };
    export { doGenerateFragment };
    export { expandRangeEndToWordBound };
    export { expandRangeStartToWordBound };
    export { findWordEndBoundInTextNode };
    export { findWordStartBoundInTextNode };
    export { FragmentFactory };
    export { getSearchSpaceForEnd };
    export { getSearchSpaceForStart };
    export { getTextNodesInSameBlock };
    export { recordStartTime };
    export { BlockTextAccumulator };
    export { getFirstTextNode };
    export { getLastTextNode };
    export { moveRangeEdgesToTextNodes };
  }
  export interface GenerateFragmentResult {
    status: {
      SUCCESS: number;
      INVALID_SELECTION: number;
      AMBIGUOUS: number;
      TIMEOUT: number;
      EXECUTION_FAILED: number;
    };
    fragment?: TextFragment;
  }
  /**
   * - the result of traversing the DOM to
   *     extract TextNodes
   */
  export interface TextNodeLists {
    /**
     * - the nodes appearing before a specified
     * starting node
     */
    preNodes: Text[];
    /**
     * - a list containing |node| if it is a
     * text node, or any text node children of |node|.
     */
    innerNodes: Text[];
    /**
     * - the nodes appearing after a specified
     * starting node
     */
    postNodes: Text[];
  }
  /**
   * Determines whether or not a range crosses a block boundary.
   * @param {Range} range - the range to investigate
   * @return {boolean} - true if a block boundary was found,
   *     false if no such boundary was found.
   */
  function containsBlockBoundary(range: Range): boolean;
  /**
   * @param {Selection} selection
   * @param {Date} startTime
   * @return {GenerateFragmentResult}
   * @see {@link generateFragment} - this method wraps the error-throwing portions
   *     of that method.
   * @throws {Error} - Will throw if computation takes longer than the accepted
   *     timeout length.
   */
  function doGenerateFragment(selection: Selection, startTime: Date): GenerateFragmentResult;
  /**
   * Modifies the end of the range, if necessary, to ensure the selection text
   * ends before a boundary char (whitespace, etc.) or a block boundary. Can only
   * expand the range, not shrink it.
   * @param {Range} range - the range to be modified
   */
  function expandRangeEndToWordBound(range: Range): void;
  /**
   * Modifies the start of the range, if necessary, to ensure the selection text
   * starts after a boundary char (whitespace, etc.) or a block boundary. Can only
   * expand the range, not shrink it.
   * @param {Range} range - the range to be modified
   */
  function expandRangeStartToWordBound(range: Range): void;
  /**
   * Attempts to find a word end within the given text node, starting at |offset|.
   *
   * @param {Node} node - a node to be searched
   * @param {number|undefined} endOffset - the character offset within |node|
   *     where the selected text end. If undefined, the entire node will be
   *     searched.
   * @return {number} the number indicating the offset to which a range should
   *     be set to ensure it ends on a word bound. Returns -1 if the node is not
   *     a text node, or if no word boundary character could be found.
   */
  function findWordEndBoundInTextNode(node: Node, endOffset: number | undefined): number;
  /**
   * Attempts to find a word start within the given text node, starting at
   * |offset| and working backwards.
   *
   * @param {Node} node - a node to be searched
   * @param {number|undefined} startOffset - the character offset within |node|
   *     where the selected text begins. If undefined, the entire node will be
   *     searched.
   * @return {number} the number indicating the offset to which a range should
   *     be set to ensure it starts on a word bound. Returns -1 if the node is not
   *     a text node, or if no word boundary character could be found.
   */
  function findWordStartBoundInTextNode(node: Node, startOffset: number | undefined): number;
  /**
   * Helper class for constructing range-based fragments for selections that cross
   * block boundaries.
   */
  const FragmentFactory: new () => {
    Mode: {
      ALL_PARTS: number;
      SHARED_START_AND_END: number;
      CONTEXT_ONLY: number;
    };
    startOffset: any;
    endOffset: any;
    prefixOffset: any;
    suffixOffset: any;
    prefixSearchSpace: string;
    backwardsPrefixSearchSpace: string;
    suffixSearchSpace: string;
    numIterations: number;
    /**
     * Generates a fragment based on the current state, then tests it for
     * uniqueness.
     * @return {TextFragment|undefined} - a text fragment if the current state is
     *     uniquely identifying, or undefined if the current state is ambiguous.
     */
    tryToMakeUniqueFragment(): TextFragment | undefined;
    /**
     * Shifts the current state such that the candidates for textStart and textEnd
     * represent more of the possible search spaces.
     * @return {boolean} - true if the desired expansion occurred; false if the
     *     entire search space has been consumed and no further attempts can be
     *     made.
     */
    embiggen(): boolean;
    /**
     * Sets up the factory for a range-based match with a highlight that crosses
     * block boundaries.
     *
     * Exactly one of this, setSharedSearchSpace, or setExactTextMatch should be
     * called so the factory can identify the fragment.
     *
     * @param {string} startSearchSpace - the maximum possible string which can be
     *     used to identify the start of the fragment
     * @param {string} endSearchSpace - the maximum possible string which can be
     *     used to identify the end of the fragment
     * @return {FragmentFactory} - returns |this| to allow call chaining and
     *     assignment
     */
    setStartAndEndSearchSpace(startSearchSpace: string, endSearchSpace: string): /*elided*/ any;
    startSearchSpace: string | undefined;
    endSearchSpace: string | undefined;
    backwardsEndSearchSpace: string | undefined;
    mode: number | undefined;
    /**
     * Sets up the factory for a range-based match with a highlight that doesn't
     * cross block boundaries.
     *
     * Exactly one of this, setStartAndEndSearchSpace, or setExactTextMatch should
     * be called so the factory can identify the fragment.
     *
     * @param {string} sharedSearchSpace - the full text of the highlight
     * @return {FragmentFactory} - returns |this| to allow call chaining and
     *     assignment
     */
    setSharedSearchSpace(sharedSearchSpace: string): /*elided*/ any;
    sharedSearchSpace: string | undefined;
    backwardsSharedSearchSpace: string | undefined;
    /**
     * Sets up the factory for an exact text match.
     *
     * Exactly one of this, setStartAndEndSearchSpace, or setSharedSearchSpace
     * should be called so the factory can identify the fragment.
     *
     * @param {string} exactTextMatch - the full text of the highlight
     * @return {FragmentFactory} - returns |this| to allow call chaining and
     *     assignment
     */
    setExactTextMatch(exactTextMatch: string): /*elided*/ any;
    exactTextMatch: string | undefined;
    /**
     * Sets up the factory for context-based matches.
     *
     * @param {string} prefixSearchSpace - the string to be used as the search
     *     space for prefix
     * @param {string} suffixSearchSpace - the string to be used as the search
     *     space for suffix
     * @return {FragmentFactory} - returns |this| to allow call chaining and
     *     assignment
     */
    setPrefixAndSuffixSearchSpace(prefixSearchSpace: string, suffixSearchSpace: string): /*elided*/ any;
    /**
     * Sets up the factory to use an instance of Intl.Segmenter when identifying
     * the start/end of words. |segmenter| is not actually retained; instead it is
     * used to create segment objects which are cached.
     *
     * This must be called AFTER any calls to setStartAndEndSearchSpace,
     * setSharedSearchSpace, and/or setPrefixAndSuffixSearchSpace, as these search
     * spaces will be segmented immediately.
     *
     * @param {Intl.Segmenter | undefined} segmenter
     * @return {FragmentFactory} - returns |this| to allow call chaining and
     *     assignment
     */
    useSegmenter(segmenter: Intl.Segmenter | undefined): /*elided*/ any;
    startSegments: Intl.Segments | undefined;
    endSegments: Intl.Segments | undefined;
    sharedSegments: Intl.Segments | undefined;
    prefixSegments: Intl.Segments | undefined;
    suffixSegments: Intl.Segments | undefined;
    /**
     * @return {number} - how many words should be added to the prefix and suffix
     *     when embiggening. This changes depending on the current state of the
     *     prefix/suffix, so it should be invoked once per embiggen, before either
     *     is modified.
     */
    getNumberOfContextWordsToAdd(): number;
    /**
     * @return {number} - how many words should be added to textStart and textEnd
     *     when embiggening. This changes depending on the current state of
     *     textStart/textEnd, so it should be invoked once per embiggen, before
     *     either is modified.
     */
    getNumberOfRangeWordsToAdd(): number;
    /**
     * Helper method for embiggening using Intl.Segmenter. Finds the next offset
     * to be tried in the forwards direction (i.e., a prefix of the search space).
     * @param {Intl.Segments} segments - the output of segmenting the desired search
     *     space using Intl.Segmenter
     * @param {number} offset - the current offset
     * @param {string} searchSpace - the search space that was segmented
     * @return {number} - the next offset which should be tried.
     */
    getNextOffsetForwards(segments: Intl.Segments, offset: number, searchSpace: string): number;
    /**
     * Helper method for embiggening using Intl.Segmenter. Finds the next offset
     * to be tried in the backwards direction (i.e., a suffix of the search
     * space).
     * @param {Intl.Segments} segments - the output of segmenting the desired search
     *     space using Intl.Segmenter
     * @param {number} offset - the current offset
     * @return {number} - the next offset which should be tried.
     */
    getNextOffsetBackwards(segments: Intl.Segments, offset: number): number;
    /**
     * @return {string} - the string to be used as the search space for textStart
     */
    getStartSearchSpace(): string;
    /**
     * @return {Segments | undefined} - the result of segmenting the start search
     *     space using Intl.Segmenter, or undefined if a segmenter was not
     *     provided.
     */
    getStartSegments(): Intl.Segments | undefined;
    /**
     * @return {string} - the string to be used as the search space for textEnd
     */
    getEndSearchSpace(): string;
    /**
     * @return {Segments | undefined} - the result of segmenting the end search
     *     space using Intl.Segmenter, or undefined if a segmenter was not
     *     provided.
     */
    getEndSegments(): Intl.Segments | undefined;
    /**
     * @return {string} - the string to be used as the search space for textEnd,
     *     backwards.
     */
    getBackwardsEndSearchSpace(): string;
    /**
     * @return {string} - the string to be used as the search space for prefix
     */
    getPrefixSearchSpace(): string;
    /**
     * @return {Segments | undefined} - the result of segmenting the prefix
     *     search space using Intl.Segmenter, or undefined if a segmenter was not
     *     provided.
     */
    getPrefixSegments(): Intl.Segments | undefined;
    /**
     * @return {string} - the string to be used as the search space for prefix,
     *     backwards.
     */
    getBackwardsPrefixSearchSpace(): string;
    /**
     * @return {string} - the string to be used as the search space for suffix
     */
    getSuffixSearchSpace(): string;
    /**
     * @return {Segments | undefined} - the result of segmenting the suffix
     *     search space using Intl.Segmenter, or undefined if a segmenter was not
     *     provided.
     */
    getSuffixSegments(): Intl.Segments | undefined;
    /**
     * Helper method for doing arithmetic in the backwards search space.
     * @return {number} - the current end offset, as a start offset in the
     *     backwards search space
     */
    backwardsEndOffset(): number;
    /**
     * Helper method for doing arithmetic in the backwards search space.
     * @param {number} backwardsEndOffset - the desired new value of the start
     *     offset in the backwards search space
     */
    setBackwardsEndOffset(backwardsEndOffset: number): void;
    /**
     * Helper method for doing arithmetic in the backwards search space.
     * @return {number} - the current prefix offset, as a start offset in the
     *     backwards search space
     */
    backwardsPrefixOffset(): number;
    /**
     * Helper method for doing arithmetic in the backwards search space.
     * @param {number} backwardsPrefixOffset - the desired new value of the prefix
     *     offset in the backwards search space
     */
    setBackwardsPrefixOffset(backwardsPrefixOffset: number): void;
  };
  /**
   * Finds the search space for parameters when using range or prefix match.
   * This is the text from the last block boundary to the end of the range,
   * trimmed to remove any leading/trailing whitespace characters.
   * @param {Range} range - the range which will be highlighted.
   * @return {string|undefined} - the text which may be used for constructing a
   *     textEnd parameter identifying this range. Will return undefined if no
   *     block boundaries are found inside this range, or if all the candidate
   *     ranges were empty (or included only whitespace characters).
   */
  function getSearchSpaceForEnd(range: Range): string | undefined;
  /**
   * Finds the search space for parameters when using range or suffix match.
   * This is the text from the start of the range to the first block boundary,
   * trimmed to remove any leading/trailing whitespace characters.
   * @param {Range} range - the range which will be highlighted.
   * @return {string|undefined} - the text which may be used for constructing a
   *     textStart parameter identifying this range. Will return undefined if no
   *     block boundaries are found inside this range, or if all the candidate
   *     ranges were empty (or included only whitespace characters).
   */
  function getSearchSpaceForStart(range: Range): string | undefined;
  /**
   * @typedef {Object} TextNodeLists - the result of traversing the DOM to
   *     extract TextNodes
   * @property {Text[]} preNodes - the nodes appearing before a specified
   *     starting node
   * @property {Text[]} innerNodes - a list containing |node| if it is a
   *     text node, or any text node children of |node|.
   * @property {Text[]} postNodes - the nodes appearing after a specified
   *     starting node
   */
  /**
   * Traverses the DOM to extract all TextNodes appearing in the same block level
   * as |node| (i.e., those that are descendants of a common ancestor of |node|
   * with no other block elements in between.)
   * @param {Text} node
   * @return {TextNodeLists}
   */
  function getTextNodesInSameBlock(node: Text): TextNodeLists;
  /**
   * Call at the start of fragment generation to set the baseline for timeout
   * checking.
   * @param {Date} newStartTime - the timestamp when fragment generation began
   */
  function recordStartTime(newStartTime: Date): void;
  /**
   * Helper class to calculate visible text from the start or end of a range
   * until a block boundary is reached or the range is exhausted.
   */
  const BlockTextAccumulator: new (
    searchRange: Range,
    isForwardTraversal: boolean
  ) => {
    searchRange: Range;
    isForwardTraversal: boolean;
    textFound: boolean;
    textNodes: any[];
    textInBlock: string | null;
    /**
     * Adds the next node in the search space range traversal to the accumulator.
     * The accumulator then will keep track of the text nodes in the range until a
     * block boundary is found. Once a block boundary is found and the content of
     * the text nodes in the boundary is non empty, the property textInBlock will
     * be set with the content of the text nodes, trimmed of leading and trailing
     * whitespaces.
     * @param {Node} node - next node in the traversal of the searchRange
     */
    appendNode(node: Node): void;
    /**
     * Calculates the intersection of a node with searchRange and returns a Text
     * Node with the intersection
     * @param {Node} node - the node to intercept with searchRange
     * @return {Node} - node if node is fully within searchRange or a Text Node
     *     with the substring of the content of node inside the search range
     */
    getNodeIntersectionWithRange(node: Node): Node;
  };
  /**
   * Finds the first visible text node within a given range.
   * @param {Range} range - range in which to find the first visible text node
   * @return {Node} - first visible text node within |range| or null if there are
   * no visible text nodes within |range|
   */
  function getFirstTextNode(range: Range): Node;
  /**
   * Finds the last visible text node within a given range.
   * @param {Range} range - range in which to find the last visible text node
   * @return {Node} - last visible text node within |range| or null if there are
   * no visible text nodes within |range|
   */
  function getLastTextNode(range: Range): Node;
  /**
   * Moves the range edges to the first and last visible text nodes inside of it.
   * If there are no visible text nodes in the range then it is collapsed.
   * @param {Range} range - the range to be modified
   */
  function moveRangeEdgesToTextNodes(range: Range): void;
  export {};
}
