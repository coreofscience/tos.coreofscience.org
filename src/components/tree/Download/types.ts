import { TreeResult } from "../../../types/result";
import { Analysis } from "../../../types/Analysis";

export type DownloadPropsType = {
  treeSections: TreeResult;
  analysis: Analysis | undefined;
};
