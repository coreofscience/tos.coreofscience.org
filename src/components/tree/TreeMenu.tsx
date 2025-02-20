import { TreeResult } from "../../types/result";
import { Info, Section } from "../../types/treeType";
import TreeMenuButton from "./TreeMenuButton";
import { FC } from "react";

type TreeMenuProps = {
  info: Info;
  treeSections: TreeResult;
  show: Section | null;
  toggleShow: (section: Section) => void;
};

const TreeMenu: FC<TreeMenuProps> = ({ treeSections, show, toggleShow }) => {
  return (
    <>
      <div className="grid-cols-buttons grid gap-4">
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
          <div className="flex min-h-[7rem] flex-col gap-[2px]">
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
