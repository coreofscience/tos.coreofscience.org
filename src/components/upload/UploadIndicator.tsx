import React, { FC } from "react";
import styled from "styled-components";

import { BlobMap } from "../../utils/customTypes";
import FileDiv from "./FileDiv";

// TODO: Use fluid grid https://gridbyexample.com/examples/example28/

const UploadZone = styled.div`
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border: 2px solid #eeeeee;
  background: linear-gradient(
    90deg,
    rgba(245, 162, 0, 0.5536414394859506) 15%,
    rgba(76, 172, 51, 0.6572828960685837) 100%
  );
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
