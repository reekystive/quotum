export const addTextAnchorToUrl = (url: URL, text: string): URL => {
  const newUrl = new URL(url.toString());

  // Encode the text for use in URL fragment
  const encodedText = encodeURIComponent(text.trim());

  // Add or replace the text fragment
  newUrl.hash = `:~:text=${encodedText}`;

  return newUrl;
};
