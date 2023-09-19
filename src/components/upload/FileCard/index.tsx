import { FC } from "react";

import CancelFile from "../../vectors/CancelFile";
import MoveFirstIcon from "../../vectors/MoveFirstIcon";
import { round } from "../../../utils/math";

interface Props {
  name: string;
  keywords?: string[];
  articles?: number;
  citations?: number;
  remove?: () => void;
  move?: () => void;
  progress: number;
  capped?: boolean;
  cumSize: number;
  maxSize: number;
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
  cumSize = 0,
  maxSize,
}: Props) => {
  const countFormat = new Intl.NumberFormat(undefined);
  const weightFormat = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
  });

  return (
    <div
      className={
        capped
          ? "flex flex-col gap-2 items-center justify-center shadow-md relative p-8 text-center bg-slate-100"
          : "flex flex-col gap-2 items-center justify-center shadow-md relative p-8 text-center"
      }
    >
      {capped && (
        <button
          onClick={move}
          className="bg-root text-slate-50 h-8 w-8 flex justify-center items-center absolute top-0 left-0 hover:bg-leaf active:bg-leaf transition-colors ease-in"
        >
          <MoveFirstIcon />
        </button>
      )}
      <button
        onClick={remove}
        className="bg-root text-slate-50 h-8 w-8 flex justify-center items-center absolute top-0 right-0 hover:bg-red-500 active:bg-red-500 transition-colors ease-in"
      >
        <CancelFile />
      </button>
      <strong
        className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[75%]"
        title={name}
      >
        {name}
      </strong>
      <small className="flex-grow flex flex-col items-center justify-center text-sm text-slate-500">
        {keywords.join(", ")}
      </small>
      <div>
        <span className="flex flex-col items-center">
          <strong className="text-2xl font-semibold">
            {countFormat.format(articles)}
          </strong>
          <small className="text-sm text-slate-500">
            {articles === 1 ? "article" : "articles"}
          </small>
        </span>
        <span className="flex flex-col items-center">
          <strong className="text-2xl font-semibold">
            {countFormat.format(citations)}
          </strong>
          <small className="text-sm text-slate-500">
            {citations === 1 ? "citation" : "citations"}
          </small>
        </span>
      </div>
      <div className="absolute bottom-2 right-2">
        <small
          className={capped ? "text-[60%] text-red-500" : "text-[60%]"}
          title="To keep our costs down, we need to limit the ammount of data we process for each tree."
        >
          {weightFormat.format(round(cumSize, 2))} /{" "}
          {weightFormat.format(round(maxSize, 2))} [MB]
        </small>
      </div>
      <div className="absolute bottom-0 h-[3px] w-full bg-slate-100">
        <div
          className="bg-leaf w-full h-[3px] origin-left"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
};

export default FileCard;
