import { Article } from "./article";

export interface ArticleWithMetrics extends Article {
  root: number;
  trunk: number;
  leaf: number;
  branch: number;
}

export interface TreeResult {
  root: ArticleWithMetrics[];
  trunk: ArticleWithMetrics[];
  leaf: ArticleWithMetrics[];
  branch_1: ArticleWithMetrics[];
  branch_2: ArticleWithMetrics[];
  branch_3: ArticleWithMetrics[];
}

export type Section = keyof TreeResult;
