import FileContext from "../../../context/FileContext";
import useFiles from "../../../hooks/useFiles";
import React, { FC, Suspense, useContext, useEffect, useState } from "react";

const FileCard = React.lazy(() => import("../FileCard"));

interface Props {
  maxSize: number;
}

const UploadIndicator: FC<Props> = ({ maxSize }) => {
  const { remove, swap } = useContext(FileContext);
  const { progress } = useContext(FileContext);
  const files = useFiles();

  const [cappedFiles, setCappedFiles] = useState<{ [hash: string]: boolean }>(
    {},
  );

  let cumSize = 0;

  useEffect(() => {
    let size = 0;
    for (const file of files) {
      size += file.blob.size / 2 ** 20;

      if (size <= maxSize) {
        setCappedFiles((prev) => ({ ...prev, [file.hash]: false }));
      } else {
        setCappedFiles((prev) => ({ ...prev, [file.hash]: true }));
      }
    }
  }, [files, maxSize]);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-articles gap-2">
      <Suspense fallback="loading...">
        {files.map((file) => {
          cumSize += file.blob.size / 2 ** 20;
          return (
            <FileCard
              name={file.name}
              progress={progress[file.hash]}
              articles={file.articles}
              citations={file.citations}
              keywords={file.keywords}
              remove={() => remove(file.hash)}
              move={() => swap(file.hash)}
              capped={cappedFiles[file.hash]}
              cumSize={cumSize}
              key={file.hash}
              maxSize={maxSize}
            />
          );
        })}
      </Suspense>
    </div>
  );
};

export default UploadIndicator;
