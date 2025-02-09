import { TreeResult } from "../../types/result";
import { Section } from "../../types/treeType";
import cn from "../../utils/cn";
import Button from "../ui/Button";
import { info } from "./constants/info";
import { FC } from "react";

type TreeMenuButtonProps = {
  section: Section;
  show: Section | null;
  className?: string;
  toggleShow: (section: Section) => void;
  treeSections: TreeResult;
};

const TreeMenuButton: FC<TreeMenuButtonProps> = ({
  section,
  show,
  className,
  toggleShow,
  treeSections,
}) => {
  return (
    <Button
      className={cn(className, "flex-col gap-1", {
        "opacity-50": show && show !== section,
      })}
      size="big"
      title={show && show === section ? "Show all" : `Show only ${section}`}
      onClick={() => toggleShow(section)}
    >
      <strong className="text-2xl font-bold uppercase">
        {info[section]?.title ?? ""}
      </strong>
      {!section.startsWith("branch") && (
        <small className="font-sans font-normal">
          {treeSections[section]?.length} articles
        </small>
      )}
    </Button>
  );
};

export default TreeMenuButton;
