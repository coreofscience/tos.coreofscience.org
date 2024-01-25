import FileContext from "../context/FileContext";
import { useCallback, useContext } from "react";

const useError = () => {
  const { add } = useContext(FileContext);

  return useCallback(
    (name: string, blob: Blob, reason: string) => {
      // we do not need to read the file if it is an error just to get a hash
      const hash = name;
      const metadata = {
        name,
        blob,
        hash,
        valid: false,
        error: reason,
      };
      add(metadata);
    },
    [add],
  );
};

export default useError;
