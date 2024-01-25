import FileContext from "../context/FileContext";
import { FileMetadata } from "../types/fileMetadata";
import isEqual from "lodash/isEqual";
import { useContext, useEffect, useState } from "react";

const useFiles = (): FileMetadata[] => {
  const [validFiles, set] = useState<FileMetadata[]>([]);
  const { files } = useContext(FileContext);

  useEffect(() => {
    set((current) => {
      const newValid = files.filter((file) => file.valid);
      if (isEqual(newValid, current)) {
        return current;
      }
      return newValid;
    });
  }, [files]);

  return validFiles;
};

export default useFiles;
