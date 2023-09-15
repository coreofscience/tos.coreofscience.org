import { FC } from "react";

import TreeMenuButton from "./TreeMenuButton";

import { Info, Section } from "../../types/treeType";
import { TreeResult } from "../../types/result";

import "./TreeMenu.css";

type Props  = {
  info: Info;
  treeSections: TreeResult;
  show: Section | null;
  toggleShow: (section: Section) => void;
}

const TreeMenu: FC<Props> = ({treeSections, show, toggleShow}) => {
  return (
    <>
      <div className="tree-menu">
        <TreeMenuButton section={"root"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
        <TreeMenuButton section={"trunk"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
        {treeSections.branch_1 && (
          <div className="btn-branches" key="section-branches">
            <TreeMenuButton section={"branch_1"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
            <TreeMenuButton section={"branch_2"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
            <TreeMenuButton section={"branch_3"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
          </div>
        )}
        <TreeMenuButton section={"leaf"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
      </div>
    </>
  )
}

export default TreeMenu;
