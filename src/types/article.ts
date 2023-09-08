export interface Article {
  label: string;
  authors?: string[];
  branch?: 1 | 2 | 3;
  keywords?: string[];
  year?: number | null;
  title?: string | null;
  journal?: string | null;
  volume?: string | null;
  issue?: string | null;
  page?: string | null;
  doi?: string | null;
}
