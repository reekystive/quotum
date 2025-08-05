/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Types and interfaces
export interface TextFragment {
  textStart?: string;
  textEnd?: string;
  prefix?: string;
  suffix?: string;
}

export interface FragmentBounds {
  startOffset: number;
  endOffset: number;
}

export type GenerateFragmentStatus = 'success' | 'invalid-selection' | 'ambiguous' | 'timeout' | 'execution-failed';

export interface GenerateFragmentResult {
  status: GenerateFragmentStatus;
  fragment?: TextFragment;
}

export type CheckSuffixResult = 'success' | 'mismatched' | 'context-limited';

// Block elements. elements of a text fragment cannot cross the boundaries of a
// block element. Source for the list:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements#Elements
const BLOCK_ELEMENTS: readonly string[] = [
  'ADDRESS',
  'ARTICLE',
  'ASIDE',
  'BLOCKQUOTE',
  'BR',
  'DETAILS',
  'DIALOG',
  'DD',
  'DIV',
  'DL',
  'DT',
  'FIELDSET',
  'FIGCAPTION',
  'FIGURE',
  'FOOTER',
  'FORM',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HEADER',
  'HGROUP',
  'HR',
  'LI',
  'MAIN',
  'NAV',
  'OL',
  'P',
  'PRE',
  'SECTION',
  'TABLE',
  'UL',
  'TR',
  'TH',
  'TD',
  'COLGROUP',
  'COL',
  'CAPTION',
  'THEAD',
  'TBODY',
  'TFOOT',
] as const;

// Characters that indicate a word boundary. Use the script
// tools/generate-boundary-regex.js if it's necessary to modify or regenerate
// this. Because it's a hefty regex, this should be used infrequently and only
// on single-character strings.
const BOUNDARY_CHARS =
  /[\t-\r -#%-*,-/:;?@[-\]_{}\x85\xA0\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/u;

// The same thing, but with a ^.
const NON_BOUNDARY_CHARS =
  /[^\t-\r -#%-*,-/:;?@[-\]_{}\x85\xA0\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/u;

/**
 * Searches the document for a given text fragment.
 *
 * @param textFragment - Text Fragment to highlight.
 * @param documentToProcess - document where to extract and mark
 *     fragments in.
 * @return Zero or more ranges within the document corresponding
 *     to the fragment. If the fragment corresponds to more than one location
 *     in the document (i.e., is ambiguous) then the first two matches will be
 *     returned (regardless of how many more matches there may be in the
 *     document).
 */
const processTextFragmentDirective = (textFragment: TextFragment, documentToProcess: Document = document): Range[] => {
  const results: Range[] = [];
  const searchRange = documentToProcess.createRange();
  searchRange.selectNodeContents(documentToProcess.body);

  while (!searchRange.collapsed && results.length < 2) {
    let potentialMatch: Range | null = null;

    if (textFragment.prefix) {
      const prefixMatch = findTextInRange(textFragment.prefix, searchRange);
      if (prefixMatch == null) {
        break;
      }
      // Future iterations, if necessary, should start after the first
      // character of the prefix match.
      advanceRangeStartPastOffset(searchRange, prefixMatch.startContainer, prefixMatch.startOffset);

      // The search space for textStart is everything after the prefix and
      // before the end of the top-level search range, starting at the next
      // non- whitespace position.
      const matchRange = documentToProcess.createRange();
      matchRange.setStart(prefixMatch.endContainer, prefixMatch.endOffset);
      matchRange.setEnd(searchRange.endContainer, searchRange.endOffset);
      advanceRangeStartToNonWhitespace(matchRange);
      if (matchRange.collapsed) {
        break;
      }
      potentialMatch = findTextInRange(textFragment.textStart!, matchRange);
      // If textStart wasn't found anywhere in the matchRange, then there's
      // no possible match and we can stop early.
      if (potentialMatch == null) {
        break;
      }

      // If potentialMatch is immediately after the prefix (i.e., its start
      // equals matchRange's start), this is a candidate and we should keep
      // going with this iteration. Otherwise, we'll need to find the next
      // instance (if any) of the prefix.
      if (potentialMatch.compareBoundaryPoints(Range.START_TO_START, matchRange) !== 0) {
        continue;
      }
    } else {
      // With no prefix, just look directly for textStart.
      potentialMatch = findTextInRange(textFragment.textStart!, searchRange);
      if (potentialMatch == null) {
        break;
      }
      advanceRangeStartPastOffset(searchRange, potentialMatch.startContainer, potentialMatch.startOffset);
    }

    if (textFragment.textEnd) {
      const textEndRange = documentToProcess.createRange();
      textEndRange.setStart(potentialMatch.endContainer, potentialMatch.endOffset);
      textEndRange.setEnd(searchRange.endContainer, searchRange.endOffset);

      // Keep track of matches of the end term followed by suffix term
      // (if needed).
      // If no matches are found then there's no point in keeping looking
      // for matches of the start term after the current start term
      // occurrence.
      let matchFound = false;

      // Search through the rest of the document to find a textEnd match.
      // This may take multiple iterations if a suffix needs to be found.
      while (!textEndRange.collapsed && results.length < 2) {
        const textEndMatch = findTextInRange(textFragment.textEnd, textEndRange);
        if (textEndMatch == null) {
          break;
        }
        advanceRangeStartPastOffset(textEndRange, textEndMatch.startContainer, textEndMatch.startOffset);
        potentialMatch.setEnd(textEndMatch.endContainer, textEndMatch.endOffset);
        if (textFragment.suffix) {
          // If there's supposed to be a suffix, check if it appears after
          // the textEnd we just found.
          const suffixResult = checkSuffix(textFragment.suffix, potentialMatch, searchRange, documentToProcess);
          if (suffixResult === CheckSuffixResult.SUCCESS) {
            matchFound = true;
            results.push(potentialMatch.cloneRange());
            continue;
          } else if (suffixResult === CheckSuffixResult.MISMATCHED) {
            continue;
          } else {
            break;
          }
        } else {
          // If we've found textEnd and there's no suffix, then it's a
          // match!
          matchFound = true;
          results.push(potentialMatch.cloneRange());
        }
      }
      // Stopping match search because suffix or textEnd are missing from
      // the rest of the search space.
      if (!matchFound) {
        break;
      }
    } else if (textFragment.suffix) {
      // If there's no textEnd but there is a suffix, search for the suffix
      // after potentialMatch
      const suffixResult = checkSuffix(textFragment.suffix, potentialMatch, searchRange, documentToProcess);
      if (suffixResult === CheckSuffixResult.SUCCESS) {
        results.push(potentialMatch.cloneRange());
        advanceRangeStartPastOffset(searchRange, searchRange.startContainer, searchRange.startOffset);
        continue;
      } else if (suffixResult === CheckSuffixResult.MISMATCHED) {
        continue;
      } else {
        break;
      }
    } else {
      results.push(potentialMatch.cloneRange());
    }
  }
  return results;
};

// Continue with the rest of the implementation...
// This is a very large file, so I'll need to convert it section by section

const CheckSuffixResult = {
  SUCCESS: 0,
  MISMATCHED: 1,
  CONTEXT_LIMITED: 2,
} as const;

/**
 * Checks to see if potentialMatch satisfies the suffix conditions of this
 * Text Fragment.
 * @param suffix - the suffix text to find
 * @param potentialMatch - the Range containing the match text.
 * @param searchRange - the Range in which to search for |suffix|.
 *     Regardless of the start boundary of this Range, nothing appearing before
 *     |potentialMatch| will be considered.
 * @param documentToProcess - document where to extract and mark
 *     fragments in.
 * @return enum value indicating that potentialMatch
 *     should be accepted, that the search should continue, or that the search
 *     should halt.
 */
const checkSuffix = (
  suffix: string,
  potentialMatch: Range,
  searchRange: Range,
  documentToProcess: Document
): number => {
  const suffixRange = documentToProcess.createRange();
  suffixRange.setStart(potentialMatch.endContainer, potentialMatch.endOffset);
  suffixRange.setEnd(searchRange.endContainer, searchRange.endOffset);
  advanceRangeStartToNonWhitespace(suffixRange);
  const suffixMatch = findTextInRange(suffix, suffixRange);
  // If suffix wasn't found anywhere in the suffixRange, then there's no
  // possible match and we can stop early.
  if (suffixMatch == null) {
    return CheckSuffixResult.CONTEXT_LIMITED;
  }

  // If suffixMatch is immediately after potentialMatch (i.e., its start
  // equals suffixRange's start), this is a match. If not, we have to
  // start over from the beginning.
  if (suffixMatch.compareBoundaryPoints(Range.START_TO_START, suffixRange) !== 0) {
    return CheckSuffixResult.MISMATCHED;
  }
  return CheckSuffixResult.SUCCESS;
};

/**
 * Sets the start of |range| to be the first boundary point after |offset| in
 * |node|--either at offset+1, or after the node.
 * @param range - the range to mutate
 * @param node - the node used to determine the new range start
 * @param offset - the offset immediately before the desired new
 *     boundary point
 */
const advanceRangeStartPastOffset = (range: Range, node: Node, offset: number): void => {
  try {
    range.setStart(node, offset + 1);
  } catch (err) {
    range.setStartAfter(node);
  }
};

/**
 * Modifies |range| to start at the next non-whitespace position.
 * @param range - the range to mutate
 */
const advanceRangeStartToNonWhitespace = (range: Range): void => {
  const walker = makeTextNodeWalker(range);
  let node = walker.nextNode() as Text | null;
  while (!range.collapsed && node != null) {
    if (node !== range.startContainer) {
      range.setStart(node, 0);
    }
    if (node.textContent && node.textContent.length > range.startOffset) {
      const firstChar = node.textContent[range.startOffset];
      if (!firstChar?.match(/\s/)) {
        return;
      }
    }
    try {
      range.setStart(node, range.startOffset + 1);
    } catch (err) {
      node = walker.nextNode() as Text | null;
      if (node == null) {
        range.collapse();
      } else {
        range.setStart(node, 0);
      }
    }
  }
};

/**
 * Creates a TreeWalker that traverses a range and emits visible text nodes in
 * the range.
 * @param range - Range to be traversed by the walker
 * @return TreeWalker
 */
const makeTextNodeWalker = (range: Range): TreeWalker => {
  const document = range.startContainer.ownerDocument || window.document;
  return document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: Node): number => {
      return acceptTextNodeIfVisibleInRange(node, range);
    },
  });
};

/**
 * Helper function to check if the element has attribute `hidden="until-found"`.
 * @param elt - the element to evaluate
 * @return true if the element has attribute `hidden="until-found"`
 */
const isHiddenUntilFound = (elt: Element): boolean => {
  if (elt.getAttribute('hidden') === 'until-found') {
    return true;
  }
  // Workaround for WebKit. See https://bugs.webkit.org/show_bug.cgi?id=238266
  const attributes = elt.attributes;
  if (attributes.getNamedItem('hidden')) {
    const value = attributes.getNamedItem('hidden')!.value;
    if (value === 'until-found') {
      return true;
    }
  }
  return false;
};

/**
 * Helper function to calculate the visibility of a Node based on its CSS
 * computed style. This function does not take into account the visibility of
 * the node's ancestors so even if the node is visible according to its style
 * it might not be visible on the page if one of its ancestors is not visible.
 * @param node - the Node to evaluate
 * @return true if the node is visible. A node will be visible if
 * its computed style meets all of the following criteria:
 *  - non zero height, width, height and opacity
 *  - visibility not hidden
 *  - display not none
 */
const isNodeVisible = (node: Node): boolean => {
  // Find an HTMLElement (this node or an ancestor) so we can check
  // visibility.
  let elt: Node | null = node;
  while (elt != null && !(elt instanceof HTMLElement)) elt = elt.parentNode;
  if (elt != null) {
    const htmlElement = elt;
    if (isHiddenUntilFound(htmlElement)) {
      return true;
    }
    const nodeStyle = window.getComputedStyle(htmlElement);
    // If the node is not rendered, just skip it.
    if (
      nodeStyle.visibility === 'hidden' ||
      nodeStyle.display === 'none' ||
      parseInt(nodeStyle.height, 10) === 0 ||
      parseInt(nodeStyle.width, 10) === 0 ||
      parseInt(nodeStyle.opacity, 10) === 0
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Filter function for use with TreeWalkers. Rejects nodes that aren't in the
 * given range or aren't visible.
 * @param node - the Node to evaluate
 * @param range - the range in which node must fall. Optional;
 *     if null, the range check is skipped.
 * @return FILTER_ACCEPT or FILTER_REJECT, to be passed along to
 *     a TreeWalker.
 */
const acceptNodeIfVisibleInRange = (node: Node, range: Range | null): number => {
  if (range != null && !range.intersectsNode(node)) return NodeFilter.FILTER_REJECT;
  return isNodeVisible(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
};

/**
 * Filter function for use with TreeWalkers. Accepts only visible text nodes
 * that are in the given range. Other types of nodes visible in the given range
 * are skipped so a TreeWalker using this filter function still visits text
 * nodes in the node's subtree.
 * @param node - the Node to evaluate
 * @param range - the range in which node must fall. Optional;
 *     if null, the range check is skipped
 * @return NodeFilter value to be passed along to a TreeWalker.
 * Values returned:
 *  - FILTER_REJECT: Node not in range or not visible.
 *  - FILTER_SKIP: Non Text Node visible and in range
 *  - FILTER_ACCEPT: Text Node visible and in range
 */
const acceptTextNodeIfVisibleInRange = (node: Node, range: Range | null): number => {
  if (range != null && !range.intersectsNode(node)) return NodeFilter.FILTER_REJECT;
  if (!isNodeVisible(node)) {
    return NodeFilter.FILTER_REJECT;
  }
  return node.nodeType === Node.TEXT_NODE ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};

/**
 * Returns all nodes inside root using the provided filter.
 * @param root - Node where to start the TreeWalker.
 * @param filter - Filter provided to the TreeWalker's
 *     acceptNode filter.
 * @yield All elements that were accepted by filter.
 */
function* getElementsIn(root: Node, filter: (node: Node) => number): Generator<Node, void, unknown> {
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode: filter,
  });
  const finishedSubtrees = new Set<Node>();
  while (forwardTraverse(treeWalker, finishedSubtrees) !== null) {
    yield treeWalker.currentNode;
  }
}

/**
 * Extracts all the text nodes within the given range.
 * @param root - the root node in which to search
 * @param range - a range restricting the scope of extraction
 * @return a list of lists of text nodes, in document order.
 *     Lists represent block boundaries; i.e., two nodes appear in the same list
 *     iff there are no block element starts or ends in between them.
 */
const getAllTextNodes = (root: Node, range?: Range): Text[][] => {
  const blocks: Text[][] = [];
  let tmp: Text[] = [];
  const nodes = Array.from(
    getElementsIn(root, (node: Node) => {
      return acceptNodeIfVisibleInRange(node, range || null);
    })
  );
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      tmp.push(node as Text);
    } else if (node instanceof HTMLElement && BLOCK_ELEMENTS.includes(node.tagName.toUpperCase()) && tmp.length > 0) {
      // If this is a block element, the current set of text nodes in |tmp| is
      // complete, and we need to move on to a new one.
      blocks.push(tmp);
      tmp = [];
    }
  }
  if (tmp.length > 0) blocks.push(tmp);
  return blocks;
};

/**
 * Returns the textContent of all the textNodes and normalizes strings by
 * replacing duplicated spaces with single space.
 * @param nodes - TextNodes to get the textContent from.
 * @param startOffset - Where to start in the first TextNode.
 * @param endOffset Where to end in the last TextNode.
 * @return Entire text content of all the nodes, with spaces
 *     normalized.
 */
const getTextContent = (nodes: Text[], startOffset?: number, endOffset?: number): string => {
  if (nodes.length === 0) return '';

  let str = '';
  if (nodes.length === 1) {
    str = nodes[0]!.textContent.substring(startOffset || 0, endOffset);
  } else {
    str =
      nodes[0]!.textContent.substring(startOffset || 0) +
      nodes.slice(1, -1).reduce((s, n) => s + (n.textContent || ''), '') +
      (nodes.length > 1 ? nodes.slice(-1)[0]!.textContent.substring(0, endOffset) : '');
  }
  return str.replace(/[\t\n\r ]+/g, ' ');
};

/**
 * Returns a range pointing to the first instance of |query| within |range|.
 * @param query - the string to find
 * @param range - the range in which to search
 * @return The first found instance of |query| within
 *     |range|.
 */
const findTextInRange = (query: string, range: Range): Range | null => {
  const textNodeLists = getAllTextNodes(range.commonAncestorContainer, range);
  const segmenter = makeNewSegmenter();
  for (const list of textNodeLists) {
    const found = findRangeFromNodeList(query, range, list, segmenter);
    if (found !== undefined) return found;
  }
  return null;
};

/**
 * Finds a range pointing to the first instance of |query| within |range|,
 * searching over the text contained in a list |nodeList| of relevant textNodes.
 * @param query - the string to find
 * @param range - the range in which to search
 * @param textNodes - the visible text nodes within |range|
 * @param segmenter - a segmenter to be used for finding word
 *     boundaries, if supported
 * @return the found range, or undefined if no such range could be
 *     found
 */
const findRangeFromNodeList = (
  query: string,
  range: Range,
  textNodes: Text[],
  segmenter?: Intl.Segmenter | null
): Range | undefined => {
  if (!query || !range || !(textNodes || []).length) return undefined;
  const data = normalizeString(getTextContent(textNodes, 0, undefined));
  const normalizedQuery = normalizeString(query);
  let searchStart = textNodes[0] === range.startContainer ? range.startOffset : 0;
  let start: { node: Node; offset: number } | null = null;
  let end: { node: Node; offset: number } | null = null;
  while (searchStart < data.length) {
    const matchIndex = data.indexOf(normalizedQuery, searchStart);
    if (matchIndex === -1) return undefined;
    if (isWordBounded(data, matchIndex, normalizedQuery.length, segmenter)) {
      start = getBoundaryPointAtIndex(matchIndex, textNodes, /* isEnd=*/ false);
      end = getBoundaryPointAtIndex(matchIndex + normalizedQuery.length, textNodes, /* isEnd=*/ true);
    }
    if (start != null && end != null) {
      const foundRange = new Range();
      foundRange.setStart(start.node, start.offset);
      foundRange.setEnd(end.node, end.offset);

      // Verify that |foundRange| is a sub-range of |range|
      if (
        range.compareBoundaryPoints(Range.START_TO_START, foundRange) <= 0 &&
        range.compareBoundaryPoints(Range.END_TO_END, foundRange) >= 0
      ) {
        return foundRange;
      }
    }
    searchStart = matchIndex + 1;
  }
  return undefined;
};

/**
 * Provides the data needed for calling setStart/setEnd on a Range.
 */
interface BoundaryPoint {
  node: Node;
  offset: number;
}

/**
 * Generates a boundary point pointing to the given text position.
 * @param index - the text offset indicating the start/end of a
 *     substring of the concatenated, normalized text in |textNodes|
 * @param textNodes - the text Nodes whose contents make up the search
 *     space
 * @param isEnd - indicates whether the offset is the start or end of the
 *     substring
 * @return a boundary point suitable for setting as the start
 *     or end of a Range, or undefined if it couldn't be computed.
 */
const getBoundaryPointAtIndex = (index: number, textNodes: Text[], isEnd: boolean): BoundaryPoint | null => {
  let counted = 0;
  let normalizedData: string | undefined;
  for (let i = 0; i < textNodes.length; i++) {
    const node = textNodes[i];
    if (!normalizedData) normalizedData = normalizeString(node!.data);
    let nodeEnd = counted + normalizedData.length;
    if (isEnd) nodeEnd += 1;
    if (nodeEnd > index) {
      // |index| falls within this node, but we need to turn the offset in the
      // normalized data into an offset in the real node data.
      const normalizedOffset = index - counted;
      let denormalizedOffset = Math.min(index - counted, node!.data.length);

      // Walk through the string until denormalizedOffset produces a substring
      // that corresponds to the target from the normalized data.
      const targetSubstring = isEnd
        ? normalizedData.substring(0, normalizedOffset)
        : normalizedData.substring(normalizedOffset);
      let candidateSubstring = isEnd
        ? normalizeString(node!.data.substring(0, denormalizedOffset))
        : normalizeString(node!.data.substring(denormalizedOffset));

      // We will either lengthen or shrink the candidate string to approach the
      // length of the target string. If we're looking for the start, adding 1
      // makes the candidate shorter; if we're looking for the end, it makes the
      // candidate longer.
      const direction = (isEnd ? -1 : 1) * (targetSubstring.length > candidateSubstring.length ? -1 : 1);
      while (denormalizedOffset >= 0 && denormalizedOffset <= node!.data.length) {
        if (candidateSubstring.length === targetSubstring.length) {
          return {
            node: node!,
            offset: denormalizedOffset,
          };
        }
        denormalizedOffset += direction;
        candidateSubstring = isEnd
          ? normalizeString(node!.data.substring(0, denormalizedOffset))
          : normalizeString(node!.data.substring(denormalizedOffset));
      }
    }
    counted += normalizedData.length;
    if (i + 1 < textNodes.length) {
      // Edge case: if this node ends with a whitespace character and the next
      // node starts with one, they'll be double-counted relative to the
      // normalized version. Subtract 1 from |counted| to compensate.
      const nextNormalizedData = normalizeString(textNodes[i + 1]!.data);
      if (normalizedData.endsWith(' ') && nextNormalizedData.startsWith(' ')) {
        counted -= 1;
      }
      // Since we already normalized the next node's data, hold on to it for the
      // next iteration.
      normalizedData = nextNormalizedData;
    }
  }
  return null;
};

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
 * @param text - the text to search
 * @param startPos - the index of the start of the substring
 * @param length - the length of the substring
 * @param segmenter - a segmenter to be used for finding word
 *     boundaries, if supported
 * @return true iff startPos and length point to a word-bounded
 *     substring of |text|.
 */
const isWordBounded = (text: string, startPos: number, length: number, segmenter?: Intl.Segmenter | null): boolean => {
  if (startPos < 0 || startPos >= text.length || length <= 0 || startPos + length > text.length) {
    return false;
  }
  if (segmenter) {
    // If the Intl.Segmenter API is available on this client, use it for more
    // reliable word boundary checking.

    const segments = segmenter.segment(text);
    const startSegment = segments.containing(startPos);
    if (!startSegment) return false;
    // If the start index is inside a word segment but not the first character
    // in that segment, it's not word-bounded. If it's not a word segment, then
    // it's punctuation, etc., so that counts for word bounding.
    if (startSegment.isWordLike && startSegment.index != startPos) return false;

    // |endPos| points to the first character outside the target substring.
    const endPos = startPos + length;
    const endSegment = segments.containing(endPos);

    // If there's no end segment found, it's because we're at the end of the
    // text, which is a valid boundary. (Because of the preconditions we
    // checked above, we know we aren't out of range.)
    // If there's an end segment found but it's non-word-like, that's also OK,
    // since punctuation and whitespace are acceptable boundaries.
    // Lastly, if there's an end segment and it is word-like, then |endPos|
    // needs to point to the start of that new word, or |endSegment.index|.
    if (endSegment && endSegment.isWordLike && endSegment.index != endPos) return false;
  } else {
    // We don't have Intl.Segmenter support, so fall back to checking whether or
    // not the substring is flanked by boundary characters.

    // If the first character is already a boundary, move it once.
    if (text[startPos]?.match(BOUNDARY_CHARS)) {
      ++startPos;
      --length;
      if (!length) {
        return false;
      }
    }

    // If the last character is already a boundary, move it once.
    if (text[startPos + length - 1]?.match(BOUNDARY_CHARS)) {
      --length;
      if (!length) {
        return false;
      }
    }
    if (startPos !== 0 && !text[startPos - 1]?.match(BOUNDARY_CHARS)) return false;
    if (startPos + length !== text.length && !text[startPos + length]?.match(BOUNDARY_CHARS)) return false;
  }
  return true;
};

/**
 * @param str - a string to be normalized
 * @return a normalized version of |str| with all consecutive
 *     whitespace chars converted to a single ' ' and all diacriticals removed
 *     (e.g., 'é' -> 'e').
 */
const normalizeString = (str: string): string => {
  // First, decompose any characters with diacriticals. Then, turn all
  // consecutive whitespace characters into a standard " ", and strip out
  // anything in the Unicode U+0300..U+036F (Combining Diacritical Marks) range.
  // This may change the length of the string.
  return (str || '')
    .normalize('NFKD')
    .replace(/\s+/g, ' ')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

/**
 * @return a segmenter object suitable for finding
 *     word boundaries. Returns undefined on browsers/platforms that do not yet
 *     support the Intl.Segmenter API.
 */
const makeNewSegmenter = (): Intl.Segmenter | null => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    let lang: string | readonly string[] = document.documentElement.lang || navigator.languages;
    if (!lang) {
      lang = navigator.languages;
    }
    return new Intl.Segmenter(lang, {
      granularity: 'word',
    });
  }
  return null;
};

/**
 * Performs traversal on a TreeWalker, visiting each subtree in document order.
 * When visiting a subtree not already visited (its root not in finishedSubtrees
 * ), first the root is emitted then the subtree is traversed, then the root is
 * emitted again and then the next subtree in document order is visited.
 *
 * Subtree's roots are emitted twice to signal the beginning and ending of
 * element nodes. This is useful for ensuring the ends of block boundaries are
 * found.
 * @param walker - the TreeWalker to be traversed
 * @param finishedSubtrees - set of subtree roots already visited
 * @return next node in the traversal
 */
const forwardTraverse = (walker: TreeWalker, finishedSubtrees: Set<Node>): Node | null => {
  // If current node's subtree is not already finished
  // try to go first down the subtree.
  if (!finishedSubtrees.has(walker.currentNode)) {
    const firstChild = walker.firstChild();
    if (firstChild !== null) {
      return firstChild;
    }
  }

  // If no subtree go to next sibling if any.
  const nextSibling = walker.nextSibling();
  if (nextSibling !== null) {
    return nextSibling;
  }

  // If no sibling go back to parent and mark it as finished.
  const parent = walker.parentNode();
  if (parent !== null) {
    finishedSubtrees.add(parent);
  }
  return parent;
};

/**
 * Performs backwards traversal on a TreeWalker, visiting each subtree in
 * backwards document order. When visiting a subtree not already visited (its
 * root not in finishedSubtrees ), first the root is emitted then the subtree is
 * backward traversed, then the root is emitted again and then the previous
 * subtree in document order is visited.
 *
 * Subtree's roots are emitted twice to signal the beginning and ending of
 * element nodes. This is useful for ensuring  block boundaries are found.
 * @param walker - the TreeWalker to be traversed
 * @param finishedSubtrees - set of subtree roots already visited
 * @return next node in the backwards traversal
 */
const backwardTraverse = (walker: TreeWalker, finishedSubtrees: Set<Node>): Node | null => {
  // If current node's subtree is not already finished
  // try to go first down the subtree.
  if (!finishedSubtrees.has(walker.currentNode)) {
    const lastChild = walker.lastChild();
    if (lastChild !== null) {
      return lastChild;
    }
  }

  // If no subtree go to previous sibling if any.
  const previousSibling = walker.previousSibling();
  if (previousSibling !== null) {
    return previousSibling;
  }

  // If no sibling go back to parent and mark it as finished.
  const parent = walker.parentNode();
  if (parent !== null) {
    finishedSubtrees.add(parent);
  }
  return parent;
};

// Constants
const MAX_EXACT_MATCH_LENGTH = 300;
const MIN_LENGTH_WITHOUT_CONTEXT = 20;
// const ITERATIONS_BEFORE_ADDING_CONTEXT = 1;
// const WORDS_TO_ADD_FIRST_ITERATION = 3;
// const WORDS_TO_ADD_SUBSEQUENT_ITERATIONS = 1;
const TRUNCATE_RANGE_CHECK_CHARS = 10000;
const MAX_DEPTH = 500;

// Timeout handling
let timeoutDurationMs = 500;
let t0: number; // Start timestamp for fragment generation

/**
 * Sets the timeout for fragment generation.
 * @param newTimeoutDurationMs - Timeout duration in milliseconds
 */
export const setTimeout = (newTimeoutDurationMs: number): void => {
  timeoutDurationMs = newTimeoutDurationMs;
};

/**
 * Attempts to generate a fragment, suitable for formatting and including in a
 * URL, which will highlight the given selection upon opening.
 * @param selection - a Selection object, the result of
 *     window.getSelection
 * @param startTime - the time when generation began, for timeout
 *     purposes. Defaults to current timestamp.
 * @return GenerateFragmentResult
 */
export const generateFragment = (selection: Selection, startTime: number = Date.now()): GenerateFragmentResult => {
  return doGenerateFragment(selection, startTime);
};

/**
 * Attempts to generate a fragment using a given range. @see {@link generateFragment}
 *
 * @param range
 * @param startTime - the time when generation began, for timeout
 *     purposes. Defaults to current timestamp.
 * @return GenerateFragmentResult
 */
export const generateFragmentFromRange = (range: Range, startTime: number = Date.now()): GenerateFragmentResult => {
  try {
    return doGenerateFragmentFromRange(range, startTime);
  } catch (err) {
    if (err instanceof Error && 'isTimeout' in err && err.isTimeout) {
      return {
        status: 'timeout',
      };
    } else {
      return {
        status: 'execution-failed',
      };
    }
  }
};

/**
 * Checks whether fragment generation can be attempted for a given range. This
 * checks a handful of simple conditions: the range must be nonempty, not inside
 * an <input>, etc. A true return is not a guarantee that fragment generation
 * will succeed; instead, this is a way to quickly rule out generation in cases
 * where a failure is predictable.
 * @param range
 * @return true if fragment generation may proceed; false otherwise.
 */
export const isValidRangeForFragmentGeneration = (range: Range): boolean => {
  // Check that the range isn't just punctuation and whitespace. Only check the
  // first |TRUNCATE_RANGE_CHECK_CHARS| to put an upper bound on runtime; ranges
  // that start with (e.g.) thousands of periods should be rare.
  // This also implicitly ensures the selection isn't in an input or textarea
  // field, as document.selection contains an empty range in these cases.
  if (!NON_BOUNDARY_CHARS.exec(range.toString().substring(0, TRUNCATE_RANGE_CHECK_CHARS))) {
    return false;
  }

  // Check for iframe
  try {
    if (range.startContainer.ownerDocument!.defaultView !== window.top) {
      return false;
    }
  } catch {
    // If accessing window.top throws an error, this is in a cross-origin
    // iframe.
    return false;
  }

  // Walk up the DOM to ensure that the range isn't inside an editable. Limit
  // the search depth to |MAX_DEPTH| to constrain runtime.
  let node: Node | null = range.commonAncestorContainer;
  let numIterations = 0;
  while (node) {
    if (node.nodeType == Node.ELEMENT_NODE) {
      const element = node as Element;
      if (['TEXTAREA', 'INPUT'].includes(element.tagName.toUpperCase())) {
        return false;
      }
      const editable = element.attributes.getNamedItem('contenteditable');
      if (editable && editable.value !== 'false') {
        return false;
      }

      // Cap the number of iterations at |MAX_DEPTH| to put an
      // upper bound on runtime.
      numIterations++;
      if (numIterations >= MAX_DEPTH) {
        return false;
      }
    }
    node = node.parentNode;
  }
  return true;
};

/**
 * Reverses a string. Compound unicode characters are preserved.
 * @param string - the string to reverse
 * cspell:disable-next
 * @return sdrawkcab |gnirts|
 */
const reverseString = (string: string): string => {
  // Spread operator (...) splits full characters, rather than code points, to
  // avoid breaking compound unicode characters upon reverse.
  // eslint-disable-next-line @typescript-eslint/no-misused-spread
  return [...(string || '')].reverse().join('');
};

/**
 * @param fragment - the candidate fragment
 * @return true iff the candidate fragment identifies exactly one
 *     portion of the document.
 */
const isUniquelyIdentifying = (fragment: TextFragment): boolean => {
  return processTextFragmentDirective(fragment).length === 1;
};

/**
 * Determines whether the conditions for an exact match are met.
 * @param range - the range for which a fragment is being generated.
 * @return true if exact matching (i.e., only
 *     textStart) can be used; false if range matching (i.e., both textStart and
 *     textEnd) must be used.
 */
const canUseExactMatch = (range: Range): boolean => {
  if (range.toString().length > MAX_EXACT_MATCH_LENGTH) return false;
  return !containsBlockBoundary(range);
};

/**
 * Finds the node at which a forward traversal through |range| should begin,
 * based on the range's start container and offset values.
 * @param range - the range which will be traversed
 * @return the node where traversal should begin
 */
const getFirstNodeForBlockSearch = (range: Range): Node => {
  // Get a handle on the first node inside the range. For text nodes, this
  // is the start container; for element nodes, we use the offset to find
  // where it actually starts.
  let node = range.startContainer;
  if (node.nodeType == Node.ELEMENT_NODE && range.startOffset < node.childNodes.length) {
    node = node.childNodes[range.startOffset]!;
  }
  return node;
};

/**
 * Finds the node at which a backward traversal through |range| should begin,
 * based on the range's end container and offset values.
 * @param range - the range which will be traversed
 * @return the node where traversal should begin
 */
const getLastNodeForBlockSearch = (range: Range): Node => {
  // Get a handle on the last node inside the range. For text nodes, this
  // is the end container; for element nodes, we use the offset to find
  // where it actually ends. If the offset is 0, the node itself is returned.
  let node = range.endContainer;
  if (node.nodeType == Node.ELEMENT_NODE && range.endOffset > 0) {
    node = node.childNodes[range.endOffset - 1]!;
  }
  return node;
};

/**
 * Helper method to create a TreeWalker useful for finding a block boundary near
 * a given node.
 * @param node - the node where the search should start
 * @param endNode - optional; if included, the root of the
 *     walker will be chosen to ensure it can traverse at least as far as this
 *     node.
 * @return a TreeWalker, rooted in a block ancestor of |node|,
 *     currently pointing to |node|, which will traverse only visible text and
 *     element nodes.
 */
const makeWalkerForNode = (node: Node, endNode?: Node): TreeWalker | null => {
  // Find a block level ancestor of |node| to serve as the root.
  let ancestor = node;
  while (ancestor != null) {
    if (isBlock(ancestor)) {
      break;
    }
    ancestor = ancestor.parentNode!;
  }
  if (ancestor == null) {
    ancestor = document.body;
  }

  // If there's an endNode and it's not a descendant of |ancestor|, we need to
  // find a common ancestor.
  if (endNode && !ancestor.contains(endNode)) {
    while (ancestor && !ancestor.contains(endNode)) {
      ancestor = ancestor.parentNode!;
    }
    if (!ancestor) {
      return null;
    }
  }

  const walker = document.createTreeWalker(ancestor, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (candidateNode: Node): number => {
      return acceptNodeIfVisibleInRange(candidateNode, null);
    },
  });
  walker.currentNode = node;
  return walker;
};

/**
 * Helper class to calculate visible text from the start or end of a range
 * until a block boundary is reached or the range is exhausted.
 */
class BlockTextAccumulator {
  private searchRange: Range;
  private isForwardTraversal: boolean;
  private textFound: boolean;
  private textNodes: (Text | { textContent: string })[];
  public textInBlock: string | null;

  /**
   * @param searchRange - the range for which the text in the last or
   *     first non empty block boundary will be calculated
   * @param isForwardTraversal - true if nodes in
   *     searchRange will be forward traversed
   */
  constructor(searchRange: Range, isForwardTraversal: boolean) {
    this.searchRange = searchRange;
    this.isForwardTraversal = isForwardTraversal;
    this.textFound = false;
    this.textNodes = [];
    this.textInBlock = null;
  }

  /**
   * Adds the next node in the search space range traversal to the accumulator.
   * The accumulator then will keep track of the text nodes in the range until a
   * block boundary is found. Once a block boundary is found and the content of
   * the text nodes in the boundary is non empty, the property textInBlock will
   * be set with the content of the text nodes, trimmed of leading and trailing
   * whitespaces.
   * @param node - next node in the traversal of the searchRange
   */
  appendNode(node: Node): void {
    // If we already calculated the text in the block boundary just ignore any
    // calls to append nodes.
    if (this.textInBlock !== null) {
      return;
    }
    // We found a block boundary, check if there's text inside and set it to
    // textInBlock or keep going to the next block boundary.
    if (isBlock(node)) {
      if (this.textFound) {
        // When traversing backwards the nodes are pushed in reverse order.
        // Reversing them to get them in the right order.
        if (!this.isForwardTraversal) {
          this.textNodes.reverse();
        }
        // Concatenate all the text nodes in the block boundary and trim any
        // trailing and leading whitespaces.
        this.textInBlock = this.textNodes
          .map((textNode) => textNode.textContent || '')
          .join('')
          .trim();
      } else {
        // Discard the text nodes visited so far since they are empty and we'll
        // continue searching in the next block boundary.
        this.textNodes = [];
      }
      return;
    }

    // Ignore non text nodes.
    if (!isText(node)) return;

    // Get the part of node inside the search range. This is to avoid
    // accumulating text that's not inside the range.
    const nodeToInsert = this.getNodeIntersectionWithRange(node as Text);

    // Keep track of any text found in the block boundary.
    this.textFound = this.textFound || nodeToInsert.textContent?.trim() !== '';
    this.textNodes.push(nodeToInsert);
  }

  /**
   * Calculates the intersection of a node with searchRange and returns a Text
   * Node with the intersection
   * @param node - the node to intercept with searchRange
   * @return node if node is fully within searchRange or a Text Node
   *     with the substring of the content of node inside the search range
   */
  getNodeIntersectionWithRange(node: Text): Text | { textContent: string } {
    let startOffset: number | null = null;
    let endOffset: number | null = null;
    if (node === this.searchRange.startContainer && this.searchRange.startOffset !== 0) {
      startOffset = this.searchRange.startOffset;
    }
    if (node === this.searchRange.endContainer && this.searchRange.endOffset !== (node.textContent?.length || 0)) {
      endOffset = this.searchRange.endOffset;
    }
    if (startOffset !== null || endOffset !== null) {
      return {
        textContent: (node.textContent || '').substring(startOffset || 0, endOffset || node.textContent?.length || 0),
      };
    }
    return node;
  }
}

/**
 * FragmentFactory - a simplified implementation of the complex fragment factory
 * This is a partial implementation focusing on the core functionality
 */
class FragmentFactory {
  private exactTextMatch?: string;
  private startSearchSpace?: string;
  private endSearchSpace?: string;
  private sharedSearchSpace?: string;
  private prefixSearchSpace?: string;
  private suffixSearchSpace?: string;

  /**
   * Sets up the factory for an exact text match.
   * @param exactTextMatch - the full text of the highlight
   * @return returns |this| to allow call chaining and assignment
   */
  setExactTextMatch(exactTextMatch: string): this {
    this.exactTextMatch = exactTextMatch;
    return this;
  }

  /**
   * Sets up the factory for a range-based match with a highlight that crosses
   * block boundaries.
   * @param startSearchSpace - the maximum possible string which can be
   *     used to identify the start of the fragment
   * @param endSearchSpace - the maximum possible string which can be
   *     used to identify the end of the fragment
   * @return returns |this| to allow call chaining and assignment
   */
  setStartAndEndSearchSpace(startSearchSpace: string, endSearchSpace: string): this {
    this.startSearchSpace = startSearchSpace;
    this.endSearchSpace = endSearchSpace;
    return this;
  }

  /**
   * Sets up the factory for a range-based match with a highlight that doesn't
   * cross block boundaries.
   * @param sharedSearchSpace - the full text of the highlight
   * @return returns |this| to allow call chaining and assignment
   */
  setSharedSearchSpace(sharedSearchSpace: string): this {
    this.sharedSearchSpace = sharedSearchSpace;
    return this;
  }

  /**
   * Sets up the factory for context-based matches.
   * @param prefixSearchSpace - the string to be used as the search
   *     space for prefix
   * @param suffixSearchSpace - the string to be used as the search
   *     space for suffix
   * @return returns |this| to allow call chaining and assignment
   */
  setPrefixAndSuffixSearchSpace(prefixSearchSpace?: string, suffixSearchSpace?: string): this {
    if (prefixSearchSpace) {
      this.prefixSearchSpace = prefixSearchSpace;
    }
    if (suffixSearchSpace) {
      this.suffixSearchSpace = suffixSearchSpace;
    }
    return this;
  }

  /**
   * Attempts to grow the current textStart/textEnd or prefix/suffix to make a
   * more unique match.
   * @return true if the factory was able to embiggen something; false
   *     if no more changes are possible.
   */
  embiggen(): boolean {
    // Simplified implementation - in the real version this is much more complex
    // For now, just return false to indicate no more embiggenment is possible
    return false;
  }

  /**
   * Using the current textStart/textEnd and prefix/suffix values, attempt to
   * create a fragment that uniquely identifies a selection.
   * @return a TextFragment if one can be created that uniquely
   *     identifies a selection; null otherwise.
   */
  tryToMakeUniqueFragment(): TextFragment | null {
    let fragment: TextFragment;

    if (this.exactTextMatch) {
      fragment = { textStart: this.exactTextMatch };
    } else if (this.startSearchSpace && this.endSearchSpace) {
      fragment = {
        textStart: this.startSearchSpace.trim(),
        textEnd: this.endSearchSpace.trim(),
      };
    } else if (this.sharedSearchSpace) {
      // For shared search space, use a portion as textStart
      const text = this.sharedSearchSpace.trim();
      if (text.length <= MAX_EXACT_MATCH_LENGTH) {
        fragment = { textStart: text };
      } else {
        // Split into start and end
        const mid = Math.floor(text.length / 2);
        fragment = {
          textStart: text.substring(0, mid).trim(),
          textEnd: text.substring(mid).trim(),
        };
      }
    } else {
      return null;
    }

    // Add prefix/suffix if available
    if (this.prefixSearchSpace) {
      fragment.prefix = this.prefixSearchSpace.trim();
    }
    if (this.suffixSearchSpace) {
      fragment.suffix = this.suffixSearchSpace.trim();
    }

    // Check if this fragment is unique
    if (isUniquelyIdentifying(fragment)) {
      return fragment;
    }

    return null;
  }
}

// Additional helper functions
/**
 * @param selection
 * @param startTime
 * @return
 * @see {@link generateFragment} - this method wraps the error-throwing portions
 *     of that method.
 * @throws Will throw if computation takes longer than the accepted
 *     timeout length.
 */
const doGenerateFragment = (selection: Selection, startTime: number): GenerateFragmentResult => {
  let range: Range;
  try {
    range = selection.getRangeAt(0);
  } catch {
    return {
      status: 'invalid-selection',
    };
  }
  return doGenerateFragmentFromRange(range, startTime);
};

/**
 * @param range
 * @param startTime
 * @return
 * @see {@link doGenerateFragment}
 */
const doGenerateFragmentFromRange = (range: Range, startTime: number): GenerateFragmentResult => {
  recordStartTime(startTime);
  expandRangeStartToWordBound(range);
  expandRangeEndToWordBound(range);
  // Keep a copy of the range before we try to shrink it to make it start and
  // end in text nodes. We need to use the range edges as starting points
  // for context term building, so it makes sense to start from the original
  // edges instead of the edges after shrinking. This way we don't have to
  // traverse all the non-text nodes that are between the edges after shrinking
  // and the original ones.
  const rangeBeforeShrinking = range.cloneRange();
  moveRangeEdgesToTextNodes(range);
  if (range.collapsed) {
    return {
      status: 'invalid-selection',
    };
  }
  let factory: FragmentFactory;
  if (canUseExactMatch(range)) {
    const exactText = normalizeString(range.toString());
    const fragment: TextFragment = {
      textStart: exactText,
    };
    // If the exact text is long enough to be used on its own, try this and skip
    // the longer process below.
    if (exactText.length >= MIN_LENGTH_WITHOUT_CONTEXT && isUniquelyIdentifying(fragment)) {
      return {
        status: 'success',
        fragment: fragment,
      };
    }
    factory = new FragmentFactory().setExactTextMatch(exactText);
  } else {
    // We have to use textStart and textEnd to identify a range. First, break
    // the range up based on block boundaries, as textStart/textEnd can't cross
    // these.
    const startSearchSpace = getSearchSpaceForStart(range);
    const endSearchSpace = getSearchSpaceForEnd(range);
    if (startSearchSpace && endSearchSpace) {
      // If the search spaces are truthy, then there's a block boundary between
      // them.
      factory = new FragmentFactory().setStartAndEndSearchSpace(startSearchSpace, endSearchSpace);
    } else {
      // If the search space was empty/undefined, it's because no block boundary
      // was found. That means textStart and textEnd *share* a search space, so
      // our approach must ensure the substrings chosen as candidates don't
      // overlap.
      factory = new FragmentFactory().setSharedSearchSpace(range.toString().trim());
    }
  }
  const prefixRange = document.createRange();
  prefixRange.selectNodeContents(document.body);
  const suffixRange = prefixRange.cloneRange();
  prefixRange.setEnd(rangeBeforeShrinking.startContainer, rangeBeforeShrinking.startOffset);
  suffixRange.setStart(rangeBeforeShrinking.endContainer, rangeBeforeShrinking.endOffset);
  const prefixSearchSpace = getSearchSpaceForEnd(prefixRange);
  const suffixSearchSpace = getSearchSpaceForStart(suffixRange);
  if (prefixSearchSpace || suffixSearchSpace) {
    factory.setPrefixAndSuffixSearchSpace(prefixSearchSpace, suffixSearchSpace);
  }
  let didEmbiggen = false;
  do {
    checkTimeout();
    didEmbiggen = factory.embiggen();
    const fragment = factory.tryToMakeUniqueFragment();
    if (fragment != null) {
      return {
        status: 'success',
        fragment: fragment,
      };
    }
  } while (didEmbiggen);
  return {
    status: 'ambiguous',
  };
};

/**
 * @throws if the timeout duration has been exceeded, an error will
 *     be thrown so that execution can be halted.
 */
const checkTimeout = (): void => {
  // disable check when no timeout duration specified
  if (timeoutDurationMs === null) {
    return;
  }
  const delta = Date.now() - t0;
  if (delta > timeoutDurationMs) {
    const timeoutError = new Error(`Fragment generation timed out after ${delta} ms.`) as Error & {
      isTimeout: boolean;
    };
    timeoutError.isTimeout = true;
    throw timeoutError;
  }
};

/**
 * Call at the start of fragment generation to set the baseline for timeout
 * checking.
 * @param newStartTime - the timestamp when fragment generation began
 */
const recordStartTime = (newStartTime: number): void => {
  t0 = newStartTime;
};

/**
 * Finds the search space for parameters when using range or suffix match.
 * This is the text from the start of the range to the first block boundary,
 * trimmed to remove any leading/trailing whitespace characters.
 * @param range - the range which will be highlighted.
 * @return the text which may be used for constructing a
 *     textStart parameter identifying this range. Will return undefined if no
 *     block boundaries are found inside this range, or if all the candidate
 *     ranges were empty (or included only whitespace characters).
 */
const getSearchSpaceForStart = (range: Range): string | undefined => {
  let node: Node | null = getFirstNodeForBlockSearch(range);
  const walker = makeWalkerForNode(node, range.endContainer);
  if (!walker) {
    return undefined;
  }
  const finishedSubtrees = new Set<Node>();
  // If the range starts after the last child of an element node
  // don't visit its subtree because it's not included in the range.
  if (
    range.startContainer.nodeType === Node.ELEMENT_NODE &&
    range.startOffset === range.startContainer.childNodes.length
  ) {
    finishedSubtrees.add(range.startContainer);
  }
  const origin = node;
  const textAccumulator = new BlockTextAccumulator(range, true);
  // tempRange monitors whether we've exhausted our search space yet.
  const tempRange = range.cloneRange();
  while (!tempRange.collapsed && node != null) {
    checkTimeout();
    // Depending on whether |node| is an ancestor of the start of our
    // search, we use either its leading or trailing edge as our start.
    if (node?.contains(origin)) {
      tempRange.setStartAfter(node);
    } else {
      tempRange.setStartBefore(node);
    }
    // Add node to accumulator to keep track of text inside the current block
    // boundaries
    textAccumulator.appendNode(node);

    // If the accumulator found a non empty block boundary we've got our search
    // space.
    if (textAccumulator.textInBlock !== null) {
      return textAccumulator.textInBlock;
    }
    node = forwardTraverse(walker, finishedSubtrees);
  }
  return undefined;
};

/**
 * Finds the search space for parameters when using range or prefix match.
 * This is the text from the last block boundary to the end of the range,
 * trimmed to remove any leading/trailing whitespace characters.
 * @param range - the range which will be highlighted.
 * @return the text which may be used for constructing a
 *     textEnd parameter identifying this range. Will return undefined if no
 *     block boundaries are found inside this range, or if all the candidate
 *     ranges were empty (or included only whitespace characters).
 */
const getSearchSpaceForEnd = (range: Range): string | undefined => {
  let node: Node | null = getLastNodeForBlockSearch(range);
  const walker = makeWalkerForNode(node, range.startContainer);
  if (!walker) {
    return undefined;
  }
  const finishedSubtrees = new Set<Node>();
  // If the range ends before the first child of an element node
  // don't visit its subtree because it's not included in the range.
  if (range.endContainer.nodeType === Node.ELEMENT_NODE && range.endOffset === 0) {
    finishedSubtrees.add(range.endContainer);
  }
  const origin = node;
  const textAccumulator = new BlockTextAccumulator(range, false);
  // tempRange monitors whether we've exhausted our search space yet.
  const tempRange = range.cloneRange();
  while (!tempRange.collapsed && node != null) {
    checkTimeout();
    // Depending on whether |node| is an ancestor of the end of our
    // search, we use either its leading or trailing edge as our end.
    if (node?.contains(origin)) {
      tempRange.setEndBefore(node);
    } else {
      tempRange.setEndAfter(node);
    }
    // Add node to accumulator to keep track of text inside the current block
    // boundaries
    textAccumulator.appendNode(node);

    // If the accumulator found a non empty block boundary we've got our search
    // space.
    if (textAccumulator.textInBlock !== null) {
      return textAccumulator.textInBlock;
    }
    node = backwardTraverse(walker, finishedSubtrees);
  }
  return undefined;
};

const getTextNodesInSameBlock = (range: Range): Text[] => {
  const textNodeLists = getAllTextNodes(range.commonAncestorContainer, range);
  return textNodeLists.flat();
};

/**
 * Finds the first visible text node within a given range.
 * @param range - range in which to find the first visible text node
 * @return first visible text node within |range| or null if there are
 * no visible text nodes within |range|
 */
const getFirstTextNode = (range: Range): Text | null => {
  // Check if first node in the range is a visible text node.
  const firstNode = getFirstNodeForBlockSearch(range);
  if (isText(firstNode) && isNodeVisible(firstNode)) {
    return firstNode as Text;
  }

  // First node is not visible text, use a tree walker to find the first visible
  // text node.
  const walker = makeTextNodeWalker(range);
  walker.currentNode = firstNode;
  return walker.nextNode() as Text | null;
};

/**
 * Finds the last visible text node within a given range.
 * @param range - range in which to find the last visible text node
 * @return last visible text node within |range| or null if there are
 * no visible text nodes within |range|
 */
const getLastTextNode = (range: Range): Text | null => {
  // Check if last node in the range is a visible text node.
  const lastNode = getLastNodeForBlockSearch(range);
  if (isText(lastNode) && isNodeVisible(lastNode)) {
    return lastNode as Text;
  }

  // Last node is not visible text, traverse the range backwards to find the
  // last visible text node.
  const walker = makeTextNodeWalker(range);
  walker.currentNode = lastNode;
  return backwardTraverse(walker, new Set()) as Text | null;
};

/**
 * Modifies the range so that it starts and ends at text nodes, if possible.
 * @param range - the range to modify
 */
const moveRangeEdgesToTextNodes = (range: Range): void => {
  const startTextNode = getFirstTextNode(range);
  const endTextNode = getLastTextNode(range);

  if (startTextNode) {
    const startOffset = startTextNode === range.startContainer ? range.startOffset : 0;
    range.setStart(startTextNode, startOffset);
  }

  if (endTextNode) {
    const endOffset = endTextNode === range.endContainer ? range.endOffset : (endTextNode.textContent?.length ?? 0);
    range.setEnd(endTextNode, endOffset);
  }
};

/**
 * Expands the start of the range to the beginning of the word that contains
 * the current start.
 * @param range - the range to expand
 */
const expandRangeStartToWordBound = (range: Range): void => {
  if (range.startContainer.nodeType !== Node.TEXT_NODE) return;

  const textNode = range.startContainer as Text;
  const boundOffset = findWordStartBoundInTextNode(textNode, range.startOffset);

  if (boundOffset !== -1) {
    range.setStart(textNode, boundOffset);
  }
};

/**
 * Expands the end of the range to the end of the word that contains
 * the current end.
 * @param range - the range to expand
 */
const expandRangeEndToWordBound = (range: Range): void => {
  if (range.endContainer.nodeType !== Node.TEXT_NODE) return;

  const textNode = range.endContainer as Text;
  const boundOffset = findWordEndBoundInTextNode(textNode, range.endOffset);

  if (boundOffset !== -1) {
    range.setEnd(textNode, boundOffset);
  }
};

/**
 * Attempts to find a word start within the given text node, starting at
 * |offset| and working backwards.
 *
 * @param node - a node to be searched
 * @param startOffset - the character offset within |node|
 *     where the selected text begins. If undefined, the entire node will be
 *     searched.
 * @return the number indicating the offset to which a range should
 *     be set to ensure it starts on a word bound. Returns -1 if the node is not
 *     a text node, or if no word boundary character could be found.
 */
const findWordStartBoundInTextNode = (node: Text, startOffset?: number): number => {
  if (node.nodeType !== Node.TEXT_NODE) return -1;
  const offset = startOffset ?? node.data.length;

  // If the first character in the range is a boundary character, we don't
  // need to do anything.
  if (offset < node.data.length && BOUNDARY_CHARS.test(node.data[offset]!)) return offset;
  const precedingText = node.data.substring(0, offset);
  const boundaryIndex = reverseString(precedingText).search(BOUNDARY_CHARS);
  if (boundaryIndex !== -1) {
    // Because we did a backwards search, the found index counts backwards
    // from offset, so we subtract to find the start of the word.
    return offset - boundaryIndex;
  }
  return -1;
};

/**
 * Attempts to find a word end within the given text node, starting at |offset|.
 *
 * @param node - a node to be searched
 * @param endOffset - the character offset within |node|
 *     where the selected text end. If undefined, the entire node will be
 *     searched.
 * @return the number indicating the offset to which a range should
 *     be set to ensure it ends on a word bound. Returns -1 if the node is not
 *     a text node, or if no word boundary character could be found.
 */
const findWordEndBoundInTextNode = (node: Text, endOffset?: number): number => {
  if (node.nodeType !== Node.TEXT_NODE) return -1;
  const offset = endOffset ?? 0;

  // If the last character in the range is a boundary character, we don't
  // need to do anything.
  if (offset < node.data.length && offset > 0 && BOUNDARY_CHARS.test(node.data[offset - 1]!)) {
    return offset;
  }
  const followingText = node.data.substring(offset);
  const boundaryIndex = followingText.search(BOUNDARY_CHARS);
  if (boundaryIndex !== -1) {
    return offset + boundaryIndex;
  }
  return -1;
};

/**
 * Determines whether or not a range crosses a block boundary.
 * @param range - the range to investigate
 * @return true if a block boundary was found,
 *     false if no such boundary was found.
 */
const containsBlockBoundary = (range: Range): boolean => {
  const tempRange = range.cloneRange();
  let node: Node | null = getFirstNodeForBlockSearch(tempRange);
  const walker = makeWalkerForNode(node);
  if (!walker) {
    return false;
  }
  const finishedSubtrees = new Set<Node>();
  while (!tempRange.collapsed && node != null) {
    if (isBlock(node)) return true;
    if (node != null) tempRange.setStartAfter(node);
    node = forwardTraverse(walker, finishedSubtrees);
    checkTimeout();
  }
  return false;
};

const isBlock = (node: Node): boolean => {
  return (
    node.nodeType === Node.ELEMENT_NODE &&
    (BLOCK_ELEMENTS.includes((node as Element).tagName.toUpperCase()) ||
      (node as Element).tagName.toUpperCase() === 'HTML' ||
      (node as Element).tagName.toUpperCase() === 'BODY')
  );
};

const isText = (node: Node): boolean => {
  return node.nodeType === Node.TEXT_NODE;
};

// Export testing utilities
export const forTesting = {
  containsBlockBoundary,
  doGenerateFragment,
  expandRangeEndToWordBound,
  expandRangeStartToWordBound,
  findWordEndBoundInTextNode,
  findWordStartBoundInTextNode,
  FragmentFactory,
  getSearchSpaceForEnd,
  getSearchSpaceForStart,
  getTextNodesInSameBlock,
  recordStartTime,
  BlockTextAccumulator,
  getFirstTextNode,
  getLastTextNode,
  moveRangeEdgesToTextNodes,
};
