import { TreeSummary } from "../../../../../types/treeSummary";

export type StateType = {
  page: number;
  data: TreeSummary[];
  status: "idle" | "loading" | "loaded" | "error";
  hasMore: boolean;
  error: Error | undefined;
};
