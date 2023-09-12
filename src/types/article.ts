export interface Article {
  label: string;
  branch?: number;
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
