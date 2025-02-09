import { Analysis } from "../../../../types/Analysis";
import { TreeResult } from "../../../../types/result";
import FloatingButtonMenuItem from "../../../common/FloatingButtonMenuItem";
import AnalysisIcon from "../../../vectors/AnalysisIcon";
import DownloadIcon from "../../../vectors/Download";
import { useFloatingButton } from "./hooks/useFloatingButton";
import React, { FC } from "react";

type FloatingButtonMenuItemsProps = {
  treeSections: TreeResult;
  analysis: Analysis | undefined;
};

const FloatingButtonMenuItems: FC<FloatingButtonMenuItemsProps> = ({
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
