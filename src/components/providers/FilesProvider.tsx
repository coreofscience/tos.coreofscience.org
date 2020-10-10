import md5 from "md5";
import React, { FC, useCallback, useMemo, useState } from "react";
import FileContext from "../../context/FileContext";
import { FileMetadata } from "../../utils/customTypes";
import {
  countArticles,
  countReferences,
  mostCommonKeywords,
} from "../../utils/isiUtils";

interface Props {
  children?: React.ReactElement;
}

const FilesProvider: FC<Props> = ({ children }: Props) => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [progress, setProgress] = useState<{ [hash: string]: number }>({});

  const add = useCallback((name: string, blob: Blob) => {
    blob.text().then((text) => {
      const hash = md5(text);
      setFiles((current) => {
        const instance = current.find((file) => file.hash === hash);
        if (instance) {
          return current;
        }
        return [
          ...current,
          {
            name,
            blob,
            hash,
            keywords: mostCommonKeywords(text, 3),
            articles: countArticles(text),
            citations: countReferences(text),
          },
        ];
      });
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

  const value = useMemo(
    () => ({
      add,
      files,
      remove,
      track,
      progress,
    }),
    [add, files, remove, track, progress]
  );

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export default FilesProvider;
