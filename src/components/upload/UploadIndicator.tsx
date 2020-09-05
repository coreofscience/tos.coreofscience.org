import React, { FC } from "react";
import styled from "styled-components";

import { BlobMap } from "../../utils/customTypes";
import FileDiv from "./FileDiv";

const UploadZone = styled.div`
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border: 2px solid #eeeeee;
  background-color: #fafafa;
`;

interface Props {
  files: BlobMap;
  onRemoveFile: (hash: string) => any;
}

const UploadIndicator: FC<Props> = ({ files, onRemoveFile }: Props) => {
  return (
    <UploadZone>
      <h2>Upload zone</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.entries(files).map(([hash, fileBlob]) => {
          return (
            <FileDiv
              key={hash}
              hash={hash}
              fileBlob={fileBlob}
              fileName={Object(fileBlob).name}
              onRemoveFile={onRemoveFile}
            />
          );
        })}
      </div>
    </UploadZone>
  );
};

export default UploadIndicator;
