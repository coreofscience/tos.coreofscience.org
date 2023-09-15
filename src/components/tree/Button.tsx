import { FC } from "react";
import { Section } from "../../types/treeType";

import { info } from "./constants/info";
import { TreeResult } from "../../types/result";

type Props = {
  section: Section;
  show: Section | null;
  toggleShow: (section: Section) => void;
  treeSections: TreeResult;
}

const Button: FC<Props> = ({section, show, toggleShow, treeSections}: Props) => {
  return (
    <button
      className={`btn btn-${section} ${section} ${
        !show || show === `${section}` ? "active" : "inactive"
      }`}
      title={`Show only ${section}`}
      onClick={() =>
        toggleShow(`${section}` as Section)
      }
      key={`menu-${section}`}
    >
      <strong>{info[section]?.title ?? ""}</strong>
      {section !== "branch_1" && section !== "branch_2" && section !== "branch_3" && (
        <small>{treeSections[section]?.length} articles</small>
      )}
    </button>
  )
}

export default Button;
