const RIS_PATTERN = /^(?<key>[A-Z0-9]{2})[ ]{2}-[ ](?<value>.*)$/;

const looksLikeScopus = (content: string): boolean => {
  let currentKey = null;
  for (const line of content.split("\n")) {
    if (!line) {
      continue;
    }
    const match = line.match(RIS_PATTERN);
    if (!match && currentKey !== "N1") {
      return false;
    }
    if (match && match.groups && match.groups.key) {
      currentKey = match.groups.key;
    }
  }
  return true;
};

const getKeywords = (content: string): string[] =>
  content
    .split("\n")
    .filter((line) => !!line)
    .map((line) => line.match(RIS_PATTERN))
    .map(
      (match) =>
        !!match &&
        match.groups &&
        match.groups.key &&
        match.groups.value &&
        match.groups.key === "KW" &&
        match.groups.value
    )
    .filter((keyword: string | false | undefined) => !!keyword) as string[];

const countArticles = (content: string): number =>
  content
    .split("\n")
    .filter((line) => !!line)
    .map((line) => line.match(RIS_PATTERN))
    .filter(
      (match) =>
        !!match && match.groups && match.groups.key && match.groups.key === "ER"
    ).length;

const countReferences = (content: string): number =>
  content
    .split("\n")
    .filter((line) => !!line)
    .map((line) => line.match(RIS_PATTERN))
    .reduce(
      ({ counting, count }, match) => {
        if (counting && !match) {
          return { counting, count: ++count };
        }
        if (!match || !match.groups) {
          return { counting, count };
        }
        if (counting && match.groups.key) {
          return { counting: false, count };
        }
        if (!counting && match.groups.key && match.groups.key === "N1") {
          if (
            match.groups.value &&
            match.groups.value.startsWith("References:")
          ) {
            return { counting: true, count: ++count };
          }
        }
        return { counting, count };
      },
      { counting: false, count: 0 }
    ).count;

export { looksLikeScopus, getKeywords, countArticles, countReferences };
