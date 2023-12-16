import { flatten } from "lodash";
import { mostCommon } from "../../../../../utils/arrays";
import { TreeMetadata } from "../../../../../types/treeMetadata";

export const summarize = (tree: TreeMetadata): string => {
  if (!tree.result) {
    return "";
  }
  const { root, trunk, leaf } = tree.result;
  const allKeywords = flatten([
    ...root.map((node) => node.keywords),
    ...trunk.map((node) => node.keywords),
    ...leaf.map((node) => node.keywords),
  ]);

  return mostCommon(
    allKeywords
      .filter((kw) => kw !== undefined)
      .map((kw) => (kw as string).toLowerCase()),
    4
  ).join(", ");
};
