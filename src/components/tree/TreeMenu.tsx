import { TreeResult } from "../../types/result";
import { Info, Section } from "../../types/treeType";
import TreeMenuButton from "./TreeMenuButton";
import { FC } from "react";

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
          className="min-h-[7rem] bg-root"
          show={show}
          toggleShow={toggleShow}
          treeSections={treeSections}
        />
        <TreeMenuButton
          section={"trunk"}
          className="min-h-[7rem] bg-trunk"
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
          className="min-h-[7rem] bg-leaf"
          show={show}
          toggleShow={toggleShow}
          treeSections={treeSections}
        />
      </div>
    </>
  );
};

export default TreeMenu;
