import { FileMetadata } from "../types/fileMetadata";

const computeQuantities = (
  files: FileMetadata[],
  maxSize: number
): {
  totalArticles: number;
  totalCitations: number;
  totalSize: number;
  articleCap: number;
  citationCap: number;
  sizeCap: number;
} => {
  const totalArticles = files.reduce((acc, el) => acc + (el.articles || 0), 0);

  const totalCitations = files.reduce(
    (acc, el) => acc + (el.citations || 0),
    0
  );

  const totalSize = files.reduce(
    (acc, el) => acc + (el.blob.size / 2 ** 20 || 0),
    0
  );

  let articleCap = 0;
  let citationCap = 0;
  let sizeCap = 0;
  for (let file of files) {
    sizeCap += file.blob.size / 2 ** 20;
    if (sizeCap > maxSize) {
      sizeCap -= file.blob.size / 2 ** 20;
      break;
    }
    articleCap += file.articles || 0;
    citationCap += file.citations || 0;
  }

  return {
    totalArticles,
    totalCitations,
    totalSize,
    articleCap,
    citationCap,
    sizeCap,
  };
};

export default computeQuantities;
