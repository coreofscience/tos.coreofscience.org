import { FC } from "react";

import TreeMenuButton from "./TreeMenuButton";

import { Info, Section } from "../../types/treeType";
import { TreeResult } from "../../types/result";

type Props = {
  info: Info;
  treeSections: TreeResult;
  show: Section | null;
  toggleShow: (section: Section) => void;
};

const TreeMenu: FC<Props> = ({ treeSections, show, toggleShow }) => {
  return (
    <>
      <div className="grid grid-cols-buttons gap-4">
        <TreeMenuButton
          section={"root"}
          className="bg-root min-h-[7rem]"
          show={show}
          toggleShow={toggleShow}
          treeSections={treeSections}
        />
        <TreeMenuButton
          section={"trunk"}
          className="bg-trunk min-h-[7rem]"
          show={show}
          toggleShow={toggleShow}
          treeSections={treeSections}
        />
        {treeSections.branch_1 && (
          <div className="flex flex-col gap-[2px] min-h-[7rem]">
            <TreeMenuButton
              section={"branch_1"}
              className="bg-branch"
              show={show}
              toggleShow={toggleShow}
              treeSections={treeSections}
            />
            <TreeMenuButton
              section={"branch_2"}
              className="bg-branch"
              show={show}
              toggleShow={toggleShow}
              treeSections={treeSections}
            />
            <TreeMenuButton
              section={"branch_3"}
              className="bg-branch"
              show={show}
              toggleShow={toggleShow}
              treeSections={treeSections}
            />
          </div>
        )}
        <TreeMenuButton
          section={"leaf"}
          className="bg-leaf min-h-[7rem]"
          show={show}
          toggleShow={toggleShow}
          treeSections={treeSections}
        />
      </div>
    </>
  );
};

export default TreeMenu;
