import { FC } from "react";
import { Section } from "../../types/treeType";

import { info } from "./constants/info";
import { TreeResult } from "../../types/result";

type Props = {
  section: Section;
  show: Section | null;
  className?: string;
  toggleShow: (section: Section) => void;
  treeSections: TreeResult;
};

const TreeMenuButton: FC<Props> = ({
  section,
  show,
  className,
  toggleShow,
  treeSections,
}: Props) => {
  return (
    <button
      className={
        "flex flex-col gap-1 items-center justify-center flex-grow" +
        " " +
        (show && show !== section ? "opacity-50" : "") +
        " " +
        (className ? className : "")
      }
      title={`Show only ${section}`}
      onClick={() => toggleShow(section)}
    >
      <strong className="font-tall text-slate-50 uppercase font-bold text-2xl">
        {info[section]?.title ?? ""}
      </strong>
      {section !== "branch_1" &&
        section !== "branch_2" &&
        section !== "branch_3" && (
          <small className="text-slate-100 font-semibold">
            {treeSections[section]?.length} articles
          </small>
        )}
    </button>
  );
};

export default TreeMenuButton;
