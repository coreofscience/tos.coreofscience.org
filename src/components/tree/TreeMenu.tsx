import { FC } from "react";
import { Props } from "../../types/treeMenuTypes";

import "./TreeMenu.css";
import Button from "./Button";


const TreeMenu: FC<Props> = ({info, treeSections, show, toggleShow}) => {
  return (
    <>
      <div className="tree-menu">
        <Button section={"root"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
        <Button section={"trunk"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
        {treeSections.branch_1 && (
          <div className="btn-branches" key="section-branches">
            <Button section={"branch_1"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
            <Button section={"branch_2"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
            <Button section={"branch_3"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
          </div>
        )}
        <Button section={"leaf"} show={show} toggleShow={toggleShow} treeSections={treeSections} />
      </div>
    </>
  )
}

export default TreeMenu;
