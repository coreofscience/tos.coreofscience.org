const mostCommon = (keywordsList: string[], max: number): string[] => {
  let count: { [keyword: string]: number } = {};
  for (let keyword of keywordsList) {
    count[keyword] = (count[keyword] ? count[keyword] : 0) + 1;
  }
  const sortCount = Object.entries(count).sort((first, second) =>
    first[1] < second[1] ? 1 : -1
  );
  return sortCount.slice(0, max).map((item) => item[0]);
};

export { mostCommon };
