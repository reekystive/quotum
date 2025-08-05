export const addTextAnchorToUrl = (args: {
  url: URL;
  anchorTextStart: string;
  anchorTextEnd?: string;
  anchorPrefix?: string;
  anchorSuffix?: string;
}): URL => {
  const { url, anchorTextStart, anchorTextEnd, anchorPrefix, anchorSuffix } = args;

  const prefix = anchorPrefix ? `${encodeURIComponent(anchorPrefix)}-,` : '';
  const suffix = anchorSuffix ? `,-${encodeURIComponent(anchorSuffix)}` : '';
  const textStart = encodeURIComponent(anchorTextStart);
  const textEnd = anchorTextEnd ? `,${encodeURIComponent(anchorTextEnd)}` : '';
  const resultUrl = new URL(url);

  // https://example.com#:~:text=[prefix-,]textStart[,textEnd][,-suffix]
  resultUrl.hash = `#:~:text=${prefix}${textStart}${textEnd}${suffix}`;

  return resultUrl;
};
