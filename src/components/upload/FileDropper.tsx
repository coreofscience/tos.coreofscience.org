import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileDropper.css";

import useError from "../../hooks/useError";
import useUpload from "../../hooks/useUpload";
import { looksLikeIsi } from "../../utils/isi";
import { looksLikeScopus } from "../../utils/scopus";

import FileErrorMap, { MAX_FILE_SIZE } from "./errors";

const FileDropper = () => {
  const upload = useUpload();
  const error = useError();
  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      acceptedFiles
        .filter((file) => file.size / 2 ** 20 > MAX_FILE_SIZE)
        .forEach((file) => {
          error(Object(file).name, file, FileErrorMap.max_size);
        });

      Promise.all(
        acceptedFiles
          .filter((file) => file.size / 2 ** 20 <= MAX_FILE_SIZE)
          .map((file) => file.text().then((text) => ({ text, file })))
      ).then((data) => {
        data.forEach(({ text, file }) => {
          if (looksLikeIsi(text) || looksLikeScopus(text)) {
            upload(Object(file).name, file);
          } else {
            error(Object(file).name, file, FileErrorMap.isi);
          }
        });
      });
    },
    [upload, error]
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
