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
  const countFormat = new Intl.NumberFormat(undefined);
  const weightFormat = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
  });

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
            {countFormat.format(articles)}
          </strong>
          <small className="fileCard__stats__unit">
            {articles === 1 ? "article" : "articles"}
          </small>
        </span>
        <span className="fileCard__stats">
          <strong className="fileCard__stats__count">
            {countFormat.format(citations)}
          </strong>
          <small className="fileCard__stats__unit">
            {citations === 1 ? "citation" : "citations"}
          </small>
        </span>
      </div>
      <div className="fileCard__weight">
        <small title="To keep our costs down, we need to limit the ammount of data we process for each tree.">
          {weightFormat.format(round(cumSize, 2))} /{" "}
          {weightFormat.format(round(MAX_SIZE, 2))} [MB]
        </small>
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
