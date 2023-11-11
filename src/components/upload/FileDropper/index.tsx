import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";

import { looksLikeIsi } from "../../../utils/isi";
import { looksLikeScopus } from "../../../utils/scopus";
import useUpload from "../../../hooks/useUpload";
import useError from "../../../hooks/useError";
import FileErrorMap from "../errors";

interface Props {
  maxSize: number;
}

const FileDropper: FC<Props> = ({ maxSize }) => {
  const upload = useUpload();
  const error = useError();
  const location = useLocation();
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      acceptedFiles
        .filter((file) => file.size / 2 ** 20 > maxSize)
        .forEach((file) => {
          error(Object(file).name, file, FileErrorMap.max_size(maxSize));
        });

      Promise.all(
        acceptedFiles
          .filter((file) => file.size / 2 ** 20 <= maxSize)
          .map((file) => file.text().then((text) => ({ text, file }))),
      ).then((data) => {
        data.forEach(({ text, file }) => {
          if (looksLikeIsi(text) || looksLikeScopus(text)) {
            upload(Object(file).name, file);
          } else {
            error(Object(file).name, file, FileErrorMap.not_supported);
          }
          if (location.pathname === "/") {
            navigate("/tos");
          }
        });
      });
    },
    [upload, error, maxSize],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div
      className="flex flex-col itemc-center bg-slate-100 text-stone-500 cursor-pointer p-4 h-32 rounded-sm overflow-hidden"
      {...getRootProps()}
    >
      <input style={{ display: "none" }} {...getInputProps()} />
      {isDragActive ? (
        <p className="flex h-full w-full m-auto items-center justify-center text-center fancy-bg-dashed-b">
          Drop the files here...
        </p>
      ) : (
        <p className="flex h-full w-full m-auto items-center justify-center text-center fancy-bg-dahsed-a">
          Drag &amp; Drop your seed files here, or choose your files.
        </p>
      )}
    </div>
  );
};

export default FileDropper;
