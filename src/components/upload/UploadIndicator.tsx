import React, { FC, useContext } from "react";
import "./UploadIndicator.css";

import FileCard from "./FileCard";
import FileContext from "../../context/files";

interface Props {}

const UploadIndicator: FC<Props> = () => {
  const { files, remove } = useContext(FileContext);
  return (
    <div className="uploadIndicator">
      {files.map((file) => (
        <FileCard
          name={file.name}
          articles={file.articles}
          citations={file.citations}
          keywords={file.keywords}
          progress={file.progress}
          remove={() => remove(file.uuid)}
          key={file.uuid}
        />
      ))}
    </div>
  );
};

export default UploadIndicator;
