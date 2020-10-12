import React, { FC, useContext } from "react";
import CancelFile from "../vectors/CancelFile";

import "./FileErrors.css";

import FileContext from "../../context/FileContext";

interface Props {}

const FileErrors: FC<Props> = () => {
  const { files, remove } = useContext(FileContext);
  return (
    <div>
      {files
        .filter((file) => !file.valid)
        .map((file) => {
          return (
            <div className="error-card" key={file.hash}>
              <div>
                <strong>{file.name}</strong> does not look like an ISI valid
                file.{" "}
              </div>
              <button
                onClick={() => remove(file.hash)}
                className="close-button"
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
