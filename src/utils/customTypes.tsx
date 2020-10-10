export interface FileMetadata {
  name: string;
  hash: string;
  blob: Blob;
  keywords?: string[];
  articles?: number;
  citations?: number;
  progress: number;
}

export interface FileContexType {
  upload: (name: string, blob: Blob) => void;
  remove: (hash: string) => void;
  files: FileMetadata[];
}

export interface BlobMap {
  [hash: string]: Blob;
}
