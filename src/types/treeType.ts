export type RootKeyword = Array<string>;
export type TrunkKeyword = Array<string>;
export type LeafKeyword = Array<string>;
export type Keywords = {
  root: RootKeyword;
  trunk: TrunkKeyword;
  leaf: LeafKeyword;
  branch: { [type: string]: Array<string> };
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
  branches: { [type: string]: { id: number; title: string } };
};
export type Section = "root" | "trunk" | "branch" | "leaf";
export type Info = {
  leaf: LeafInfo;
  root: RootInfo;
  trunk: TrunkInfo;
  branch: BranchInfo;
};
