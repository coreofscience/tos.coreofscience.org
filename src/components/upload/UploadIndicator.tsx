import React, { FC } from "react";
import styled from "styled-components";

import { BlobMap } from "../../utils/customTypes";
import FileDiv from "./FileDiv";

// TODO: Use fluid grid https://gridbyexample.com/examples/example28/

const UploadZone = styled.div`
  margin-top: 10px;
`;

interface Props {
  files: BlobMap;
  onRemoveFile: (hash: string) => any;
}

const UploadIndicator: FC<Props> = ({ files, onRemoveFile }: Props) => {
  return (
    <UploadZone>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.entries(files).length === 0 && (
          <div className="file-div tumbstone">Drag some files up there</div>
        )}
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
