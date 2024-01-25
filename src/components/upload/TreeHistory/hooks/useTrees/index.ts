import { TreeSummary } from "../../../../../types/treeSummary";
import { useTreesClient } from "../useTreesClient";
import { getInitialState } from "./getInitialState";
import { StateType } from "./types";
import { useCallback, useEffect, useState } from "react";

/**
 * Consider converting into a context, if you need to add more logic.
 */
export const useTrees = (count: number) => {
  const treesClient = useTreesClient();

  const [state, setState] = useState<StateType>(getInitialState());

  const setSuccessTrees = useCallback(
    (trees: TreeSummary[]) =>
      setState((prev) => ({
        ...prev,
        data: [...prev.data, ...trees],
        status: "loaded",
        hasMore: trees.length === count,
        error: undefined,
      })),
    [count],
  );

  const setFailedTrees = useCallback(
    (error: Error) =>
      setState((prev) => ({ ...prev, status: "error", hasMore: true, error })),
    [],
  );

  const fetchNextTrees = useCallback(
    () => setState((prev) => ({ ...prev, page: prev.page + 1 })),
    [],
  );

  /**
   * Retrieves next user trees pages.
   * Ensuring to verify if the component is still mounted to be able to set the state
   */
  useEffect(() => {
    if (!treesClient || state.page < 1) return;

    let mounted = true;

    setState((prev) => ({ ...prev, status: "loading" }));

    const lastTreeId: string | undefined =
      state.data[state.data.length - 1]?.treeId;

    treesClient
      .getTrees({ lastTreeId, count })
      .then((trees) => mounted && setSuccessTrees(trees))
      .catch((error) => mounted && setFailedTrees(error));

    return () => {
      mounted = false;
    };
  }, [
    treesClient,
    state.page,
    count,
    setSuccessTrees,
    setFailedTrees,
    state.data,
  ]);

  /**
   * Retrieves first user trees page.
   * Ensuring to verify if the component is still mounted to be able to set the state
   */
  useEffect(() => {
    if (!treesClient) return;

    let mounted = true;

    setState((prev) => ({ ...prev, status: "loading" }));

    treesClient
      .getTrees({ count })
      .then((trees) => mounted && setSuccessTrees(trees))
      .catch((error) => mounted && setFailedTrees(error));

    return () => {
      mounted = false;
      setState(getInitialState());
    };
  }, [treesClient, count, setSuccessTrees, setFailedTrees]);

  return {
    state,
    actions: { fetchNextTrees },
  };
};
