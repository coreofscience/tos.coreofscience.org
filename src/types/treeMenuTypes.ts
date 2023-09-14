import { Info, Section } from "./treeType";
import { TreeResult } from "./result";

export type Props  = {
  info: Info;
  treeSections: TreeResult;
  show: Section | null;
  toggleShow: (section: Section) => void;
}
