import { DownloadPropsType } from "../../../types";
import { downloadFile } from "./utils/downloadFile";
import { fileAsUri } from "./utils/fileAsUri";
import Papa from "papaparse";
import { useCallback, useState } from "react";

export const useFloatingButton = ({
  treeSections,
  analysis,
}: DownloadPropsType) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadArticles = useCallback(() => {
    setIsDownloading(true);
    const articles = Object.values(treeSections).flat();
    const csv = Papa.unparse(articles);
    const uri = fileAsUri(csv);
    downloadFile(uri, "articles.csv");
    setIsDownloading(false);
  }, [treeSections]);

  const downloadAnalysis = useCallback(() => {
    if (!analysis) return;

    setIsDownloading(true);
    const years: string[] = Object.keys(analysis.cited);
    const data: { year: number; cited: number; published: number }[] = [];
    years.forEach((year) => {
      data.push({
        year: Number(year),
        cited: analysis.cited[year],
        published: analysis.published[year],
      });
    });
    const csv = Papa.unparse(data);
    const uri = fileAsUri(csv);
    downloadFile(uri, "analysis.csv");
    setIsDownloading(false);
  }, [analysis]);

  return {
    state: { isDownloading },
    actions: { downloadArticles, downloadAnalysis },
  };
};
