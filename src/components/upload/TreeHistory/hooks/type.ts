import { TreeSummary } from "../../../../types/treeSummary";

export type useTreesType = {
 state: {
  data: TreeSummary[],
  isLoading: boolean,
  hasMore: boolean,
 },
 actions: {
  fetchNextTrees: () => void,
 },
};
