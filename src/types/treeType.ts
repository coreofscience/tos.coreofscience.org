export type RootKeyword = Array<string>;
export type TrunkKeyword = Array<string>;
export type LeafKeyword = Array<string>;
export type BranchKeyword = Array<string>;
export type Keywords = {
  root: RootKeyword;
  trunk: TrunkKeyword;
  leaf: LeafKeyword;
  branch_1: BranchKeyword;
  branch_2: BranchKeyword;
  branch_3: BranchKeyword;
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
export type Section = "root" | "trunk" | "branch_1" | "branch_2" | "branch_3" | "leaf";
export type Info = {
  leaf: LeafInfo;
  root: RootInfo;
  trunk: TrunkInfo;
  branch_1: BranchInfo;
  branch_2: BranchInfo;
  branch_3: BranchInfo;
};
