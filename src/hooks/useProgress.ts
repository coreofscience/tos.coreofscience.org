import FileContext from "../context/FileContext";
import { useContext, useState, useEffect } from "react";

const useProgress = (hash: string) => {
  const [value, set] = useState(0);
  const { progress } = useContext(FileContext);

  useEffect(() => {
    set(progress[hash]);
  }, [progress, hash]);

  return value;
};

export default useProgress;
