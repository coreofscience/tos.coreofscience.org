import useError from "../../hooks/useError";
import useUpload from "../../hooks/useUpload";
import { looksLikeIsi } from "../../utils/isi";
import { looksLikeScopusCsv } from "../../utils/scopusCsv";
import { looksLikeScopusRis } from "../../utils/scopusRis";
import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";

const FileErrorMap = {
  not_supported: "does not look like a valid CSV, BIB, or ISI file",
  max_size: (maxSize: number) => `is too big to process (max. ${maxSize}MB)`,
};

type FileDropperProps = {
  maxSize: number;
};

const FileDropper: FC<FileDropperProps> = ({ maxSize }) => {
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
          if (
            looksLikeIsi(text) ||
            looksLikeScopusRis(text) ||
            looksLikeScopusCsv(text)
          ) {
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
    [upload, error, maxSize, location.pathname, navigate],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div
      className="itemc-center flex h-32 cursor-pointer flex-col overflow-hidden rounded-xs bg-slate-100 p-4 text-stone-500"
      {...getRootProps()}
    >
      <input style={{ display: "none" }} {...getInputProps()} />
      {isDragActive ? (
        <p className="fancy-bg-dashed-b m-auto flex h-full w-full items-center justify-center text-center">
          Drop the files here...
        </p>
      ) : (
        <p className="fancy-bg-dahsed-a m-auto flex h-full w-full items-center justify-center text-center">
          Drag &amp; Drop your seed files here, or choose your files.
        </p>
      )}
    </div>
  );
};

export default FileDropper;
