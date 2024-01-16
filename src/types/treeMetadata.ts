import { TreeResult } from "./result";
import { Analysis } from "./Analysis";

export interface TreeMetadata {
  createdDate: number;
  files: string[];
  _analysis?: Analysis;
  startedDate?: number;
  finishedDate?: number;
  result?: TreeResult;
  error?: string;
  stars?: Record<string /* base64 of the Article label */, boolean>;
}
