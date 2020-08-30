import React, { FC, useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import md5 from "md5";

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
  cursor: pointer;
`;

interface BlobMap {
  [hash: string]: Blob;
}

interface Props {
  onNewFiles?: (files: BlobMap) => any;
}

const FileDropper: FC<Props> = ({ onNewFiles }: Props) => {
  const [validFiles, setValidFiles] = useState<BlobMap>({});

  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    const valid: BlobMap = {};
    Promise.all(
      acceptedFiles.map((file) => file.text().then((text) => ({ text, file })))
    ).then((data) => {
      data.forEach(({ text, file }) => {
        if (looksLikeIsi(text)) {
          valid[md5(text)] = file;
        }
      });
      setValidFiles((current) => ({ ...current, ...valid }));
    });
  }, []);

  useEffect(() => {
    if (onNewFiles) onNewFiles(validFiles);
  }, [validFiles, onNewFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "text/*",
  });
  return (
    <div>
      <DropzoneRoot {...getRootProps()} hoveringFile={isDragActive}>
        <input style={{ display: "none" }} {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &amp; drop some files here, or click to select files</p>
        )}
      </DropzoneRoot>
      <pre>{JSON.stringify(Object.keys(validFiles), null, 2)}</pre>
    </div>
  );
};

export default FileDropper;
