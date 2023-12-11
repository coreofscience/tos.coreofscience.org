import React from "react";

import { useFloatingButton } from "./hooks/useFloatingButton";

import FloatingButtonMenuItem from "../../../common/FloatingButtonMenuItem";
import DownloadIcon from "../../../vectors/Download";
import AnalysisIcon from "../../../vectors/AnalysisIcon";

import { DownloadPropsType } from "../types";

const FloatingButtonMenuItems: React.FC<DownloadPropsType> = ({
  treeSections,
  analysis,
}) => {
  const { actions } = useFloatingButton({ treeSections, analysis });

  return (
    <>
      <FloatingButtonMenuItem
        name="Articles"
        icon={<DownloadIcon />}
        action={actions.downloadArticles}
        attributes={{
          "arial-label": "download",
          title: "Download CSV of articles",
        }}
      />
      {analysis && (
        <FloatingButtonMenuItem
          name="Analysis"
          icon={<AnalysisIcon />}
          action={actions.downloadAnalysis}
          attributes={{
            "arial-label": "download",
            title: "Download CSV of analysis",
          }}
        />
      )}
    </>
  );
};

export default FloatingButtonMenuItems;
