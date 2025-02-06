import { round } from "../../../utils/math";
import Button from "../../ui/Button";
import CancelIcon from "../../vectors/CancelIcon";
import MoveFirstIcon from "../../vectors/MoveFirstIcon";
import { FC } from "react";

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
          ? "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-sm bg-slate-100 p-8 text-center shadow-md"
          : "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-sm p-8 text-center shadow-md"
      }
    >
      {capped && (
        <button
          onClick={move}
          className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-root text-slate-50 transition-colors ease-in hover:bg-leaf active:bg-leaf"
        >
          <MoveFirstIcon />
        </button>
      )}
      <Button
        size="icon"
        variant="root"
        onClick={remove}
        className="absolute right-0 top-0 hover:bg-red-500 active:bg-red-500"
      >
        <CancelIcon />
      </Button>
      <strong
        className="max-w-[75%] overflow-hidden overflow-ellipsis whitespace-nowrap"
        title={name}
      >
        {name}
      </strong>
      <small className="flex flex-grow flex-col items-center justify-center text-sm text-slate-500">
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
          className="h-[3px] w-full origin-left bg-leaf"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
};

export default FileCard;
