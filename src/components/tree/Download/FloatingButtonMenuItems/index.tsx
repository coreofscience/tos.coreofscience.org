import FloatingButtonMenuItem from "../../../common/FloatingButtonMenuItem";
import AnalysisIcon from "../../../vectors/AnalysisIcon";
import DownloadIcon from "../../../vectors/Download";
import { DownloadPropsType } from "../types";
import { useFloatingButton } from "./hooks/useFloatingButton";
import React from "react";

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
