import { Analysis } from "../../../types/Analysis";
import { TreeResult } from "../../../types/result";

export type DownloadPropsType = {
  treeSections: TreeResult;
  analysis: Analysis | undefined;
};
