import React, { FC, useContext, useEffect, useState } from "react";
import "./UploadIndicator.css";

import FileCard from "./FileCard";
import FileContext from "../../context/FileContext";
import useFiles from "../../hooks/useFiles";

interface Props {}

const UploadIndicator: FC<Props> = () => {
  const { remove } = useContext(FileContext);
  const { progress } = useContext(FileContext);
  const files = useFiles();

  const [cappedFiles, setCappedFiles] = useState<{ [hash: string]: boolean }>(
    {}
  );

  useEffect(() => {
    let count = 0;
    for (const file of files) {
      console.log(file);
    }
  }, [files]);

  return (
    <div className="uploadIndicator">
      {files.map((file) => {
        return (
          <FileCard
            name={file.name}
            progress={progress[file.hash]}
            articles={file.articles}
            citations={file.citations}
            keywords={file.keywords}
            remove={() => remove(file.hash)}
            key={file.hash}
          />
        );
      })}
    </div>
  );
};

export default UploadIndicator;
