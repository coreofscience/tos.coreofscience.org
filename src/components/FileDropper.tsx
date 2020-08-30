import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import looksLikeIsi from "../utils/looksLikeIsi";

const DropzoneRoot = styled.div<{ hoveringFile?: boolean }>`
  border-collapse: separate;
  font-family: sans-serif;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px dashed;
  border-color: ${({ hoveringFile }) =>
    hoveringFile ? "lightblue" : "#eeeeee"};
  border-radius: 2px;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const FileDropper: FC<{}> = () => {
  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file) => {
      file.text().then((data) => console.log(looksLikeIsi(data)));
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "text/*",
  });
  return (
    <DropzoneRoot {...getRootProps()} hoveringFile={isDragActive}>
      <input style={{ display: "none" }} {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &amp; drop some files here, or click to select files</p>
      )}
    </DropzoneRoot>
  );
};

export default FileDropper;
