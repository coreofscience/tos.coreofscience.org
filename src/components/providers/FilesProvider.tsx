import React, { FC, useCallback, useMemo, useState } from "react";
import FileContext from "../../context/FileContext";
import { FileMetadata } from "../../utils/customTypes";

interface Props {
  children?: React.ReactElement;
}

const FilesProvider: FC<Props> = ({ children }: Props) => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [progress, setProgress] = useState<{ [hash: string]: number }>({});

  const add = useCallback((metadata: FileMetadata) => {
    const { hash } = metadata;
    setFiles((current) => {
      const instance = current.find((file) => file.hash === hash);
      if (instance) {
        return current;
      }
      return [...current, metadata];
    });
  }, []);

  const remove = useCallback((hash: string) => {
    setFiles((prev) => {
      const index = prev.findIndex((file) => file.hash === hash);
      if (index < 0) {
        return prev;
      }
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }, []);

  const track = useCallback((hash: string, value: number) => {
    setProgress((prev) => {
      const current = prev[hash];
      if (current === value) {
        return prev;
      }
      return { ...prev, [hash]: value };
    });
  }, []);

  const swap = useCallback(
    (hash: string) => {
      setFiles((prev) => {
        const index = prev.findIndex((file) => file.hash === hash);
        if (index < 0) {
          return prev;
        }
        return [
          files[index],
          ...prev.slice(0, index),
          ...prev.slice(index + 1),
        ];
      });
    },
    [files]
  );

  const value = useMemo(
    () => ({
      add,
      files,
      remove,
      track,
      progress,
      swap,
    }),
    [add, files, remove, track, progress, swap]
  );

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export default FilesProvider;
