import React, { FC } from "react";

import CancelFile from "../vectors/CancelFile";
import "./FileCard.css";

interface Props {
  name: string;
  keywords?: string[];
  articles?: number;
  citations?: number;
  remove?: () => void;
  progress: number;
  capped?: boolean;
}

const FileCard: FC<Props> = ({
  name,
  keywords = [],
  articles = 0,
  citations = 0,
  progress = 0,
  remove = () => {},
  capped = true,
}: Props) => {
  return (
    <div className={capped ? "fileCard capped" : "fileCard"}>
      <button onClick={remove} className="fileCard__closeButton">
        <CancelFile />
      </button>
      <strong className="fileCard__name" title={name}>
        {name}
      </strong>
      <small className="fileCard__keywords">{keywords.join(", ")}</small>
      <div className="fileCard__statGroup">
        <span className="fileCard__stats">
          <strong className="fileCard__stats__count">{articles}</strong>
          <small className="fileCard__stats__unit">
            {articles === 1 ? "article" : "articles"}
          </small>
        </span>
        <span className="fileCard__stats">
          <strong className="fileCard__stats__count">{citations}</strong>
          <small className="fileCard__stats__unit">
            {citations === 1 ? "citation" : "citations"}
          </small>
        </span>
      </div>
      <div className="fileCard_progressBar">
        <div
          className="fileCard_progressAdjustment"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
};

export default FileCard;
