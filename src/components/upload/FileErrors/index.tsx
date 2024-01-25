import FileContext from "../../../context/FileContext";
import useInvalidFiles from "../../../hooks/useInvalidFiles";
import CancelIcon from "../../vectors/CancelIcon";
import { FC, useContext } from "react";

const FileErrors: FC = () => {
  const { remove } = useContext(FileContext);
  const files = useInvalidFiles();

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {files.map((file) => {
        return (
          <div className="flex flex-row items-center gap-2" key={file.hash}>
            <span>
              <strong>{file.name}</strong> {file.error}.
            </span>
            <button
              onClick={() => remove(file.hash)}
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center bg-red-500"
              title="dismiss"
            >
              <CancelIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FileErrors;
