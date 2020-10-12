import md5 from "md5";
import { useCallback, useContext } from "react";

import FileContext from "../context/FileContext";

const useError = () => {
  const { add } = useContext(FileContext);

  const addError = useCallback(
    (name: string, blob: Blob) => {
      blob.text().then((text) => {
        const hash = md5(text);
        const metadata = {
          name,
          blob,
          hash,
          valid: false,
        };
        add(metadata);
      });
    },
    [add]
  );

  return addError;
};

export default useError;
