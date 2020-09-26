import React, { FC } from "react";
import styled from "styled-components";

import { BlobMap } from "../../utils/customTypes";
import FileDiv from "./FileDiv";
import FileCard from "./FileCard";

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
        <FileCard
          name="file.isi"
          articles={5}
          citations={25}
          keywords={["hola", "que", "hace"]}
          progress={30}
        />
        <FileCard
          name="file.isi"
          articles={5}
          citations={25}
          keywords={[
            "these",
            "are",
            "a",
            "lot",
            "of",
            "keywords",
            "big",
            "words",
          ]}
        />
        <FileCard
          name="very big file name.isi"
          articles={5}
          citations={25}
          keywords={["hola", "que", "hace"]}
          progress={75}
        />
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
