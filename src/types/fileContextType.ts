import { FileMetadata } from "./fileMetadata";

export interface FileContextType {
  add: (metadata: FileMetadata) => void;
  remove: (hash: string) => void;
  track: (hash: string, progress: number) => void;
  swap: (hash: string) => void;
  progress: { [hash: string]: number };
  files: FileMetadata[];
}
