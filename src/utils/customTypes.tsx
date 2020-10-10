export interface FileMetadata {
  name: string;
  hash: string;
  blob: Blob;
  keywords?: string[];
  articles?: number;
  citations?: number;
}

export interface FileContexType {
  add: (metadata: FileMetadata) => void;
  remove: (hash: string) => void;
  track: (hash: string, progress: number) => void;
  progress: { [hash: string]: number };
  files: FileMetadata[];
}

export interface BlobMap {
  [hash: string]: Blob;
}
