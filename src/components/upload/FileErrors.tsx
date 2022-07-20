import { useContext } from "react";

import FileContext from "../../context/FileContext";
import useInvalidFiles from "../../hooks/useInvalidFiles";
import CancelFile from "../vectors/CancelFile";

import "./FileErrors.css";

const FileErrors = () => {
  const { remove } = useContext(FileContext);
  const files = useInvalidFiles();
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
