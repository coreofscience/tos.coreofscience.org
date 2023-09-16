import { FC, useContext } from "react";

import CancelFile from "../../vectors/CancelFile";
import FileContext from "../../../context/FileContext";
import useInvalidFiles from "../../../hooks/useInvalidFiles";


const FileErrors: FC = () => {
  const { remove } = useContext(FileContext);
  const files = useInvalidFiles();

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="fileErrors">
      {files.map((file) => {
        return (
          <div className="errorCard" key={file.hash}>
            <span>
              <strong>{file.name}</strong> {file.error}.
            </span>
            <button
              onClick={() => remove(file.hash)}
              className="close-button"
              title="dismiss"
            >
              <CancelFile />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FileErrors;
