import { mostCommon } from "./arrays";
import * as isi from "./isi";
import md5 from "md5";
import { FileMetadata } from "../types/fileMetadata";

const metadata = async (name: string, blob: Blob): Promise<FileMetadata> => {
  const content = await blob.text();
  const hash = md5(content);

  if (isi.looksLikeIsi(content)) {
    return {
      name,
      blob,
      hash,
      keywords: mostCommon(isi.keywords(content), 3),
      articles: isi.countArticles(content),
      citations: isi.countReferences(content),
      valid: true,
    };
  }

  return {
    name,
    hash,
    blob,
    valid: false,
  };
};

export default metadata;
