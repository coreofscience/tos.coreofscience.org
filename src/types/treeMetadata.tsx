import { Article } from "./article";

export interface TreeMetadata {
  createdDate: number;
  files: string[];
  startedDate?: number;
  finishedDate?: number;
  result?: { [section: string]: Article[] };
  error?: string;
  stars?: Record<string /* base64 of the Article label */, boolean>;
}
