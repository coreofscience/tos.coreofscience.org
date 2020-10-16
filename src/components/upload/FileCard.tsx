import React, { FC } from "react";

import CancelFile from "../vectors/CancelFile";
import MoveFirstIcon from "../vectors/MoveFirstIcon";

import { round } from "../../utils/mathUtils";
import { MAX_SIZE } from "../../utils/computeQuantities";

import "./FileCard.css";

interface Props {
  name: string;
  keywords?: string[];
  articles?: number;
  citations?: number;
  remove?: () => void;
  move?: () => void;
  progress: number;
  capped?: boolean;
  size: number;
  cumSize: number;
}

const FileCard: FC<Props> = ({
  name,
  keywords = [],
  articles = 0,
  citations = 0,
  progress = 0,
  remove = () => {},
  move = () => {},
  capped = true,
  size = 0,
  cumSize = 0,
}: Props) => {
  const numberFormat = new Intl.NumberFormat();

  return (
    <div className={capped ? "fileCard capped" : "fileCard"}>
      {capped && (
        <button onClick={move} className="fileCard__moveButton">
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
          <strong className="fileCard__stats__count">
            {numberFormat.format(articles)}
          </strong>
          <small className="fileCard__stats__unit">
            {articles === 1 ? "article" : "articles"}
          </small>
        </span>
        <span className="fileCard__stats">
          <strong className="fileCard__stats__count">
            {numberFormat.format(citations)}
          </strong>
          <small className="fileCard__stats__unit">
            {citations === 1 ? "citation" : "citations"}
          </small>
        </span>
        <span className="fileCard__stats">
          <small className="fileCard__stats__unit">
            size: {numberFormat.format(round(size, 1))}MB
          </small>
          <small className="fileCard__stats__unit">
            cum. size: {numberFormat.format(round(cumSize, 1))}MB/
            {numberFormat.format(round(MAX_SIZE, 1))}MB
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
