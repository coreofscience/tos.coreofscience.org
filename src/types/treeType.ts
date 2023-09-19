export type Keywords = {
  root: Array<string>;
  trunk: Array<string>;
  leaf: Array<string>;
  branch_1: Array<string>;
  branch_2: Array<string>;
  branch_3: Array<string>;
};
export type RootInfo = {
  title: string;
  info: string;
};
export type TrunkInfo = {
  title: string;
  info: string;
};
export type LeafInfo = {
  title: string;
  info: string;
};
export type BranchInfo = {
  title: string;
  info: string;
};
export type Section =
  | "root"
  | "trunk"
  | "branch_1"
  | "branch_2"
  | "branch_3"
  | "leaf";
export type Info = {
  leaf: LeafInfo;
  root: RootInfo;
  trunk: TrunkInfo;
  branch_1?: BranchInfo;
  branch_2?: BranchInfo;
  branch_3?: BranchInfo;
};
