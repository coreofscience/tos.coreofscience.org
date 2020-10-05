import React, { FC, useContext } from "react";
import styled from "styled-components";

import FileCard from "./FileCard";
import FileContext from "../../context/files";

// TODO: Use fluid grid https://gridbyexample.com/examples/example28/

const UploadZone = styled.div`
  margin-top: 10px;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

interface Props {}

const UploadIndicator: FC<Props> = () => {
  const { files, remove } = useContext(FileContext);
  return (
    <UploadZone>
      {files.map((file) => (
        <FileCard
          name="file.isi"
          articles={file.articles}
          citations={file.citations}
          keywords={file.keywords}
          progress={file.progress}
          remove={() => remove(file.uuid)}
          key={file.uuid}
        />
      ))}
    </UploadZone>
  );
};

export default UploadIndicator;
