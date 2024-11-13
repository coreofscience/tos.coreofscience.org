const ISI_PATTERN = /^(.|null)?((?<key>[0-9A-Z]{2})| {2})( (?<value>.+))?$/;

const looksLikeIsi = (content: string): boolean => {
  for (const line of content.split("\n")) {
    if (!line) {
      continue;
    }
    const match = line.match(ISI_PATTERN);
    if (!match) {
      return false;
    }
  }
  return true;
};

const keywords = (text: string): string[] => {
  const identifier = "ID ";
  const keywordsLines = text
    .split("\n")
    .filter((line) => line.startsWith(identifier));
  return keywordsLines
    .map((line) =>
      line
        .replace(identifier, "")
        .trim()
        .split(";")
        .map((keyword) => keyword.trim().toLowerCase())
        .filter((keyword) => Boolean(keyword)),
    )
    .flat();
};

const countArticles = (text: string): number => {
  const identifier = "PT ";
  return text.split("\n").filter((line) => line.startsWith(identifier)).length;
};

const countReferences = (text: string): number => {
  const identifier = "NR ";
  return text
    .split("\n")
    .filter((line) => line.startsWith(identifier))
    .map((line) => parseInt(line.replace(identifier, "")))
    .reduce((n, m) => n + m, 0);
};

export { ISI_PATTERN, looksLikeIsi, keywords, countArticles, countReferences };
