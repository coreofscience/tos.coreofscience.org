import useUser from "../../hooks/useUser";
import { Analysis } from "../../types/Analysis";
import { TreeResult } from "../../types/result";
import FloatingButtonMenu from "../common/FloatingButtonMenu";
import FloatingButtonMenuItems from "../common/FloatingButtonMenuItems";
import AddIcon from "../vectors/AddIcon";
import CancelIcon from "../vectors/CancelIcon";
import DownloadIcon from "../vectors/Download";
import { FC } from "react";
import { Link } from "react-router-dom";

type DownloadProps = {
  treeSections: TreeResult;
  analysis: Analysis | undefined;
};

const Download: FC<DownloadProps> = ({ treeSections, analysis }) => {
  const user = useUser();

  if (!user || user.plan !== "pro") {
    return (
      <Link
        aria-label="download"
        className="fixed bottom-10 right-10 rounded-full bg-slate-400/90 px-4 py-4 shadow-xs hover:shadow-md active:shadow-md"
        title="Become a pro user to download"
        to="/pricing"
      >
        <DownloadIcon />
      </Link>
    );
  }

  return (
    <FloatingButtonMenu iconResting={<CancelIcon />} iconActive={<AddIcon />}>
      <FloatingButtonMenuItems
        treeSections={treeSections}
        analysis={analysis}
      />
    </FloatingButtonMenu>
  );
};

export default Download;
