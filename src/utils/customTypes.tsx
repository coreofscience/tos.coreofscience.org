export interface FileMetadata {
  name: string;
  hash: string;
  blob: Blob;
  valid: boolean;
  keywords?: string[];
  articles?: number;
  citations?: number;
  error?: string;
  capped?: boolean;
}

export interface FileContexType {
  add: (metadata: FileMetadata) => void;
  remove: (hash: string) => void;
  track: (hash: string, progress: number) => void;
  swap: (hash: string) => void;
  progress: { [hash: string]: number };
  files: FileMetadata[];
}

export interface BlobMap {
  [hash: string]: Blob;
}

export interface Article {
  label: string;
  authors?: string[];
  keywords?: string[];
  year?: number | null;
  title?: string | null;
  journal?: string | null;
  volume?: string | null;
  issue?: string | null;
  page?: string | null;
  doi?: string | null;
}

export interface TreeMetadata {
  createdDate: number;
  files: string[];
  startedDate?: number;
  finishedDate?: number;
  result?: { [section: string]: Article[] };
  error?: string;
  stars?: Record<string /* base64 of the Article label */, boolean>;
}
