import { TreeResult } from "../../types/result";
import { Section } from "../../types/treeType";
import { info } from "./constants/info";
import { FC } from "react";

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
        "flex flex-grow flex-col items-center justify-center gap-1 rounded-sm" +
        " " +
        (show && show !== section ? "opacity-50" : "") +
        " " +
        (className ? className : "")
      }
      title={`Show only ${section}`}
      onClick={() => toggleShow(section)}
    >
      <strong className="font-tall text-2xl font-bold uppercase text-slate-50">
        {info[section]?.title ?? ""}
      </strong>
      {section !== "branch_1" &&
        section !== "branch_2" &&
        section !== "branch_3" && (
          <small className="font-semibold text-slate-100">
            {treeSections[section]?.length} articles
          </small>
        )}
    </button>
  );
};

export default TreeMenuButton;
