const ISI_PATTERN = /^(.|null)?((?<key>[0-9A-Z]{2})| {2})( (?<value>.+))?$/;

const looksLikeIsi = (content: string): boolean => {
  for (let line of content.split("\n")) {
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

const getKeywordsList = (text: string) => {
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
        .filter((keyword) => Boolean(keyword))
    )
    .flat();
};

function mostCommon(keywordsList: string[], max: number) {
  let count: { [keyword: string]: number } = {};
  for (let keyword of keywordsList) {
    count[keyword] = (count[keyword] ? count[keyword] : 0) + 1;
  }
  const sortCount = Object.entries(count).sort((first, second) =>
    first[1] < second[1] ? 1 : -1
  );
  return sortCount.slice(0, max).map((item) => item[0]);
}

const mostCommonKeywords = (text: string, max: number = 3) => {
  const keywordsList = getKeywordsList(text);
  return mostCommon(keywordsList, max);
};

const countArticles = (text: string) => {
  const identifier = "PT ";
  return text.split("\n").filter((line) => line.startsWith(identifier)).length;
};

const countReferences = (text: string) => {
  const identifier = "NR ";
  return text
    .split("\n")
    .filter((line) => line.startsWith(identifier))
    .map((line) => parseInt(line.replace(identifier, "")))
    .reduce((n, m) => n + m, 0);
};

export {
  ISI_PATTERN,
  looksLikeIsi,
  mostCommonKeywords,
  mostCommon,
  countArticles,
  countReferences,
};
