import { getTrees } from "./getUserTrees";
import { UserTreesClientDepsType } from "./types";

export const TreesClient = (deps: UserTreesClientDepsType) => ({
  getTrees: getTrees.bind(0, deps),
});
