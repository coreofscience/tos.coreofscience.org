import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import md5 from "md5";

import looksLikeIsi from "../../utils/looksLikeIsi";
import { BlobMap } from "../../utils/customTypes";

const DropzoneRoot = styled.div<{ hoveringFile?: boolean }>`
  border-collapse: separate;
  font-family: sans-serif;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed;
  border-color: ${({ hoveringFile }) =>
    hoveringFile ? "lightblue" : "#eeeeee"};
  border-radius: 2px;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  & p {
    padding: 20px;
  }
`;

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
