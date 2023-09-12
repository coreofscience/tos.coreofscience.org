import { Article } from "./article";

export interface ArticleWithMetrics extends Article {
  root: number;
  trunk: number;
  leaf: number;
  branch_1: number;
  branch_2: number;
  branch_3: number;
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
