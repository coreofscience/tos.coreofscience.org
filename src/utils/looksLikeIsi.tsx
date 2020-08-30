const ISI_PATTERN = /^(.|null)?((?<key>[0-9A-Z]{2})| {2})( (?<value>.+))?$/;

const looksLikeIsi = (content: string): boolean => {
  for (let line of content.split("\n")) {
    if (!line) {
      continue;
    }
    const match = line.match(ISI_PATTERN);
    if (!match) {
      console.log(`${line} doesn't look like isi`);
      return false;
    }
  }
  return true;
};

export { ISI_PATTERN };
export default looksLikeIsi;
