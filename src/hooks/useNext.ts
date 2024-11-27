import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type NextType = {
  next: string | null;
  nextSearch: string;
};

const useNext = (): NextType => {
  const [searchParams] = useSearchParams();
  const next = useMemo(() => searchParams.get("next"), [searchParams]);
  const nextSearch = useMemo(
    () => (next ? `?next=${encodeURIComponent(next)}` : ""),
    [next],
  );
  return { next, nextSearch };
};

export default useNext;
