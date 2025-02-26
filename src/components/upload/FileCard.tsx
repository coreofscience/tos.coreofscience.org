import { round } from "../../utils/math";
import Button from "../ui/Button";
import CancelIcon from "../vectors/CancelIcon";
import MoveFirstIcon from "../vectors/MoveFirstIcon";
import { FC } from "react";

type FileCardProps = {
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
};

const FileCard: FC<FileCardProps> = ({
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
}) => {
  const countFormat = new Intl.NumberFormat(undefined);
  const weightFormat = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
  });

  return (
    <div
      className={
        capped
          ? "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xs bg-slate-100 p-8 text-center shadow-md"
          : "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xs p-8 text-center shadow-md"
      }
    >
      {capped && (
        <button
          onClick={move}
          className="bg-root hover:bg-leaf active:bg-leaf absolute top-0 left-0 flex h-8 w-8 items-center justify-center text-slate-50 transition-colors ease-in"
        >
          <MoveFirstIcon />
        </button>
      )}
      <Button
        size="icon"
        variant="root"
        onClick={remove}
        className="absolute top-0 right-0 hover:bg-red-500 active:bg-red-500"
      >
        <CancelIcon />
      </Button>
      <strong
        className="max-w-[75%] overflow-hidden text-ellipsis whitespace-nowrap"
        title={name}
      >
        {name}
      </strong>
      <small className="flex grow flex-col items-center justify-center text-sm text-slate-500">
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
      <div className="absolute right-2 bottom-2">
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
          className="bg-leaf h-[3px] w-full origin-left"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
};

export default FileCard;
