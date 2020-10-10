import { useMemo } from "react";

const useProgress = (hash: string) => {
  const value = useMemo(() => Math.random(), []);
  return value;
};

export default useProgress;
