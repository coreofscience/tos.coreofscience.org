import { useContext, useEffect, useState } from "react";
import { isEqual } from "lodash";

import FileContext from "../context/FileContext";

import { FileMetadata } from "../types/fileMetadata";

const useInvalidFiles = (): FileMetadata[] => {
  const [invalidFiles, set] = useState<FileMetadata[]>([]);
  const { files } = useContext(FileContext);

  useEffect(() => {
    set((current) => {
      const newInvalid = files.filter((file) => !file.valid);
      if (isEqual(newInvalid, current)) {
        return current;
      }
      return newInvalid;
    });
  }, [files]);

  return invalidFiles;
};

export default useInvalidFiles;
