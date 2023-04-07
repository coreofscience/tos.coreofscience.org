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