import FileContext from "../context/FileContext";
import { FileMetadata } from "../types/fileMetadata";
import { useContext, useMemo } from "react";

const useInvalidFiles = (): FileMetadata[] => {
  const { files } = useContext(FileContext);
  return useMemo(() => files.filter((file) => !file.valid), [files]);
};

export default useInvalidFiles;
