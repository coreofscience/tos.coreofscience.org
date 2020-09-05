import React, { FC, useState } from "react";
import styled from "styled-components";
import "./FileDiv.css";

const FileZone = styled.div<{ hover?: boolean }>`
  background-color: ${({ hover }) => (hover ? "pink" : "gold")};
  border: 2px solid black;
  border-radius: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  padding: 10px;
  transition: 300ms;
`;

interface Props {
  hash: string;
  fileBlob: Blob;
  fileName: string;
  onRemoveFile: (file: string) => any;
}

const FileDiv: FC<Props> = ({
  hash,
  fileBlob,
  fileName,
  onRemoveFile,
}: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <FileZone hover={hover}>
      <span>{fileName}</span>
      <div
        className="close-button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onRemoveFile(hash)}
      />
    </FileZone>
  );
};

export default FileDiv;
