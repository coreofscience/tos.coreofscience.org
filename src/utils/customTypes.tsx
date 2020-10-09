export interface FileMetadata {
  name: string;
  uuid: string;
  blob: Blob;
  keywords?: string[];
  articles?: number;
  citations?: number;
  progress: number;
}

export interface FileContexType {
  upload: (name: string, blob: Blob) => void;
  remove: (uuid: string) => void;
  files: FileMetadata[];
}

export interface BlobMap {
  [hash: string]: Blob;
}
