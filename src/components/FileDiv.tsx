import React, { FC, useState } from "react";
import styled from "styled-components";
import "./FileDiv.css";

const FileZone = styled.div<{ hover?: boolean }>`
  background-color: ${({ hover }) => (hover ? "pink" : "gold")};
  border: 2px solid black;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
  transition: 300ms;
`;

interface Props {
  fileBlob: Blob;
  fileName: string;
}

const FileDiv: FC<Props> = ({ fileBlob, fileName }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <FileZone hover={hover}>
      <span>{fileName}</span>
      <div
        className="close-button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => console.log(fileName)}
      />
    </FileZone>
  );
};

export default FileDiv;
