import { FC, useContext } from "react";

import CancelIcon from "../../vectors/CancelIcon";
import FileContext from "../../../context/FileContext";
import useInvalidFiles from "../../../hooks/useInvalidFiles";

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
          <div className="flex flex-row gap-2 items-center" key={file.hash}>
            <span>
              <strong>{file.name}</strong> {file.error}.
            </span>
            <button
              onClick={() => remove(file.hash)}
              className="flex justify-center items-center flex-shrink-0 bg-red-500 w-6 h-6"
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
