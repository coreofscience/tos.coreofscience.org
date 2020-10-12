import React, { FC, useContext } from "react";

import CancelFile from "../vectors/CancelFile";
import FileContext from "../../context/FileContext";
import useInvalidFiles from "../../hooks/useInvalidFiles";

import "./FileErrors.css";

interface Props {}

const FileErrors: FC<Props> = () => {
  const { remove } = useContext(FileContext);
  const files = useInvalidFiles();
  return (
    <div className="fileErrors">
      {files.map((file) => {
        return (
          <div className="errorCard" key={file.hash}>
            <span>
              <strong>{file.name}</strong> does not look like an ISI valid file.
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
