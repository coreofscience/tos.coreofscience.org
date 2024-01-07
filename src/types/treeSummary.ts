export type TreeSummary = {
  treeId: string;
  summary: { keywords: string[]; createdDate: Date } | null;
  planId: "pro" | "basic";
};
