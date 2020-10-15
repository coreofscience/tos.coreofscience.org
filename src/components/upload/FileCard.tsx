import React, { FC, useState } from "react";

import CancelFile from "../vectors/CancelFile";
import MoveFirstIcon from "../vectors/MoveFirstIcon";

import "./FileCard.css";

interface Props {
  name: string;
  keywords?: string[];
  articles?: number;
  citations?: number;
  remove?: () => void;
  progress: number;
  capped?: boolean;
  size: number;
}

const FileCard: FC<Props> = ({
  name,
  keywords = [],
  articles = 0,
  citations = 0,
  progress = 0,
  remove = () => {},
  capped = true,
  size = 0,
}: Props) => {
  const numberFormat = new Intl.NumberFormat();
  const [showMoveButton, setShowMoveButton] = useState<boolean>(false);

  return (
    <div
      className={capped ? "fileCard capped" : "fileCard"}
      onMouseEnter={() => setShowMoveButton(true)}
      onMouseLeave={() => setShowMoveButton(false)}
    >
      {showMoveButton && (
        <button onClick={remove} className="fileCard__moveButton">
          <MoveFirstIcon />
        </button>
      )}
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
        <span className="fileCard__stats">
          <strong className="fileCard__stats__count">
            {numberFormat.format(size)}
          </strong>
          <small className="fileCard__stats__unit">size [MB]</small>
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
