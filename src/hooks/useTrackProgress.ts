import { useCallback } from "react";

const useTrackProgress = () => {
  const set = useCallback((hash: string, value: number) => {
    console.log("setting value", { hash, value });
  }, []);
  return set;
};

export default useTrackProgress;
