import md5 from "md5";
import React, { FC, useCallback, useMemo, useState } from "react";
import FileContext from "../../context/files";
import { FileMetadata } from "../../utils/customTypes";

interface Props {
  children?: React.ReactElement;
}

const uuid = (blob: Blob): Promise<string> => {
  return blob.text().then((text) => md5(text));
};

const FilesProvider: FC<Props> = ({ children }: Props) => {
  const [files, setFiles] = useState<FileMetadata[]>([]);

  const upload = useCallback((name: string, blob: Blob) => {
    uuid(blob).then((hash) => {
      setFiles((current) => {
        const instance = current.find((file) => file.uuid === hash);
        if (instance) {
          return current;
        }
        return [
          ...current,
          {
            name,
            blob,
            uuid: hash,
            progress: Math.random() * 100,
            // TODO: Las otras cosas
          },
        ];
      });
    });
  }, []);

  const remove = useCallback((uuid: string) => {
    setFiles((prev) => {
      const index = prev.findIndex((file) => file.uuid === uuid);
      if (index < 0) {
        return prev;
      }
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }, []);

  const value = useMemo(
    () => ({
      upload,
      files,
      remove,
    }),
    [upload, files, remove]
  );

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export default FilesProvider;
