import React, { FC, useState } from "react";
import styled from "styled-components";

// TODO: Make it look like this https://www.figma.com/file/c3WgeyN7inEdtMxQHAqPga/tos.coreofcience.org?node-id=1%3A2

const FileCard = styled.div<{ hover?: boolean }>`
  background-color: ${({ hover }) => (hover ? "pink" : "gold")};
  border: 2px solid black;
  border-radius: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  padding: 10px;
  transition: 300ms;
  position: relative;

  & .close-button {
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background: #000000;
    display: inline-block;
    z-index: 200;
    position: absolute;
    right: -10px;
    top: 8px;
    margin-left: -16px;
    margin-top: -16px;
    cursor: pointer;
  }

  & .close-button:before,
  & .close-button:after {
    content: "";
    width: 55%;
    height: 1px;
    background: #ffffff;
    position: absolute;
    top: 48%;
    left: 22%;
    transform: rotate(-45deg);
    transition: all 0.3s ease-out;
  }

  & .close-button:after {
    transform: rotate(45deg);
    transition: all 0.3s ease-out;
  }

  & .close-button:hover:before,
  & .close-button:hover:after {
    transform: rotate(180deg);
  }
`;

interface Props {
  hash: string;
  fileBlob: Blob;
  fileName: string;
  onRemoveFile: (file: string) => any;
}

const FileDiv: FC<Props> = ({ hash, fileName, onRemoveFile }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <FileCard hover={hover}>
      <span>{fileName}</span>
      <div
        className="close-button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onRemoveFile(hash)}
      />
    </FileCard>
  );
};

export default FileDiv;
