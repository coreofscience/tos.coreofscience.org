import { FileMetadata } from "../types/fileMetadata";
import { mostCommon } from "./arrays";
import * as isi from "./isi";
import * as scopusCsv from "./scopusCsv";
import * as scopusRis from "./scopusRis";
import md5 from "md5";

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

  if (scopusRis.looksLikeScopusRis(content)) {
    return {
      name,
      blob,
      hash,
      keywords: mostCommon(scopusRis.keywords(content), 3),
      articles: scopusRis.countArticles(content),
      citations: scopusRis.countReferences(content),
      valid: true,
    };
  }

  if (scopusCsv.looksLikeScopusCsv(content)) {
    return {
      name,
      blob,
      hash,
      keywords: mostCommon(scopusCsv.keywords(content), 3),
      articles: scopusCsv.countArticles(content),
      citations: scopusCsv.countReferences(content),
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
