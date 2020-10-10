import React, { FC, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import "./FileDropper.css";

import { looksLikeIsi } from "../../utils/isiUtils";
import FileContext from "../../context/FileContext";
import useUpload from "../../hooks/useUpload";

interface Props {}

const FileDropper: FC<Props> = () => {
  const { add } = useContext(FileContext);
  const uploadFirebase = useUpload();
  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      Promise.all(
        acceptedFiles.map((file) =>
          file.text().then((text) => ({ text, file }))
        )
      ).then((data) => {
        data.forEach(({ text, file }) => {
          if (looksLikeIsi(text)) {
            add(Object(file).name, file);
            uploadFirebase(Object(file).name, file);
          }
        });
      });
    },
    [add, uploadFirebase]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className="fileDropper" {...getRootProps()}>
      <input style={{ display: "none" }} {...getInputProps()} />
      {isDragActive ? (
        <p className="fileDropper__dragActive">Drop the files here ...</p>
      ) : (
        <p>Drop &amp; your seed files here, or choose your files</p>
      )}
    </div>
  );
};

export default FileDropper;
