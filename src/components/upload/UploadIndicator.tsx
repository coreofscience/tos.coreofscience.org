import FileContext from "../../context/FileContext";
import useFiles from "../../hooks/useFiles";
import React, { FC, Suspense, useContext, useMemo } from "react";

const FileCard = React.lazy(() => import("./FileCard"));

type UploadIndicatorProps = {
  maxSize: number;
};

const UploadIndicator: FC<UploadIndicatorProps> = ({ maxSize }) => {
  const { remove, swap } = useContext(FileContext);
  const { progress } = useContext(FileContext);
  const files = useFiles();

  const sizing = useMemo(
    () =>
      files.reduce<{ cumSize: number; capped: boolean }[]>((acc, file) => {
        const cumSize = (acc.at(-1)?.cumSize ?? 0) + file.blob.size / 2 ** 20;
        return [...acc, { cumSize, capped: cumSize > maxSize }];
      }, []),
    [files, maxSize],
  );

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="grid-cols-articles grid gap-2">
      <Suspense fallback="loading...">
        {files.map((file, index) => {
          return (
            <FileCard
              name={file.name}
              progress={progress[file.hash] ?? 0}
              articles={file.articles}
              citations={file.citations}
              keywords={file.keywords}
              remove={() => remove(file.hash)}
              move={() => swap(file.hash)}
              capped={sizing[index].capped}
              cumSize={sizing[index].cumSize}
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
