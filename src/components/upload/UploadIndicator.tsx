import React, { FC, useContext } from "react";
import "./UploadIndicator.css";

import FileCard from "./FileCard";
import FileContext from "../../context/FileContext";

interface Props {}

const UploadIndicator: FC<Props> = () => {
  // TODO: Bring progress here
  const { files, remove } = useContext(FileContext);
  return (
    <div className="uploadIndicator">
      {files.map((file) => (
        <FileCard
          name={file.name}
          hash={file.hash}
          articles={file.articles}
          citations={file.citations}
          keywords={file.keywords}
          remove={() => remove(file.hash)}
          key={file.hash}
        />
      ))}
    </div>
  );
};

export default UploadIndicator;
