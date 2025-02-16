import Papa from "papaparse";
import { z } from "zod";

const fileSchema = z.array(
  z.object({
    Authors: z.string(),
    "Author Keywords": z.string(),
    "Index Keywords": z.string(),
    References: z.string(),
  }),
);

type CsvFileType = z.infer<typeof fileSchema>;

const readCsvText = (text: string): CsvFileType => {
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
  return fileSchema.parse(data);
};

const looksLikeScopusCsv = (text: string): boolean => {
  try {
    const data = readCsvText(text);
    return data.length > 0;
  } catch {
    return false;
  }
};

const keywords = (text: string): string[] => {
  const data = readCsvText(text);
  const keywords = data.flatMap((item) => [
    ...item["Author Keywords"].split(";"),
    ...item["Index Keywords"].split(";"),
  ]);
  return Array.from(new Set(keywords));
};

const countArticles = (text: string): number => {
  const data = readCsvText(text);
  return data.length;
};

const countReferences = (text: string): number => {
  const data = readCsvText(text);
  const references = data.flatMap((item) => item["References"].split("; "));
  return references.length;
};

export { looksLikeScopusCsv, keywords, countArticles, countReferences };
