import React, { FC, useContext } from "react";
import CancelFile from "../vectors/CancelFile";

import "./FileErrors.css";

import FileContext from "../../context/FileContext";

interface Props {}

const FileErrors: FC<Props> = () => {
  const { files, remove } = useContext(FileContext);
  return (
    <div className="fileErrors">
      {files
        .filter((file) => !file.valid)
        .map((file) => {
          return (
            <div className="errorCard" key={file.hash}>
              <span>
                <strong>{file.name}</strong> does not look like an ISI valid
                file.
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
