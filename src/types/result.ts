import { Article } from "./article";

export interface ArticleWithMetrics extends Article {
  root: number;
  trunk: number;
  leaf: number;
}

export interface TreeResult {
  root: ArticleWithMetrics[];
  trunk: ArticleWithMetrics[];
  leaf: ArticleWithMetrics[];
}

export type Section = keyof TreeResult;
