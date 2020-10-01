import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import md5 from 'md5';

import { looksLikeIsi } from '../../utils/isiUtils';
import { BlobMap } from '../../utils/customTypes';

const DropzoneRoot = styled.div<{ hoveringFile?: boolean }>`
  border-collapse: separate;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-color: ${({ hoveringFile }) =>
    hoveringFile ? 'lightblue' : '#eeeeee'};
  background-color: #f0f0f0;
  color: #5b5b5b;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  padding: 10px;
  height: 636px;
  height: 153px;
  & p {
    display: flex;
    width: 100%;
    height: 10em;
    border: 1px dashed #5b5b5b;
    box-sizing: border-box;
    margin: 0;
    align-items: center;
    justify-content: center;
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
    accept: 'text/*',
  });
  return (
    <DropzoneRoot {...getRootProps()} hoveringFile={isDragActive}>
      <input style={{ display: 'none' }} {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop &amp; your seed files here, or choose your files</p>
      )}
    </DropzoneRoot>
  );
};

export default FileDropper;
