import React from "react";
import { Link } from "react-router-dom";

import useUser from "../../../hooks/useUser";

import FloatingButtonMenu from "../../common/FloatingButtonMenu";

import DownloadIcon from "../../vectors/Download";
import CancelIcon from "../../vectors/CancelIcon";
import AddIcon from "../../vectors/AddIcon";
import FloatingButtonMenuItems from "./FloatingButtonMenuItems";

import { DownloadPropsType } from "./types";

const Download: React.FC<DownloadPropsType> = ({ treeSections, analysis }) => {
  const user = useUser();

  if (!user || user.plan !== "pro") {
    return (
      <Link
        aria-label="download"
        className="fixed bottom-10 right-10 rounded-full bg-slate-400/90 px-4 py-4 shadow-sm hover:shadow-md active:shadow-md"
        title="Become a pro user to download"
        to="/pricing"
      >
        <DownloadIcon />
      </Link>
    );
  }

  return (
    <>
      <FloatingButtonMenu iconResting={<CancelIcon />} iconActive={<AddIcon />}>
        <FloatingButtonMenuItems
          treeSections={treeSections}
          analysis={analysis}
        />
      </FloatingButtonMenu>
    </>
  );
};

export default Download;
