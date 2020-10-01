import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import md5 from "md5";
import "./FileDropper.css";

import { looksLikeIsi } from "../../utils/isiUtils";
import { BlobMap } from "../../utils/customTypes";

interface Props {
  onNewFiles?: (files: BlobMap) => any;
}

const FileDropper: FC<Props> = ({ onNewFiles }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      const valid: BlobMap = {};
      Promise.all(
        acceptedFiles.map((file) =>
          file.text().then((text) => ({ text, file }))
        )
      ).then((data) => {
        data.forEach(({ text, file }) => {
          if (looksLikeIsi(text)) {
            valid[md5(text)] = file;
          }
        });
        if (onNewFiles) {
          onNewFiles(valid);
        }
      });
    },
    [onNewFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "text/*",
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
