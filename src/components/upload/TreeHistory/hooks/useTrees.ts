import { useCallback, useEffect, useState } from "react";
import {
  collection,
  limit,
  query,
  startAfter,
  orderBy,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

import useFirebase from "../../../../hooks/useFirebase";
import useUser from "../../../../hooks/useUser";

import { summarize } from "./utils/summarize";

import { TreeMetadata } from "../../../../types/treeMetadata";
import { TreeSummary } from "../../../../types/treeSummary";

export const useTrees = (type: "proTrees" | "trees", count: number) => {
  const firebase = useFirebase();
  const user = useUser();
  const [data, setData] = useState<TreeSummary[]>([]);
  const [lastDoc, setLastDoc] = useState<
    QueryDocumentSnapshot<DocumentData> | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchNextTrees = useCallback(() => {
    if (!user?.uid) return;

    setIsLoading(true);

    getDocs(
      lastDoc
        ? query(
            collection(firebase.firestore, `users/${user.uid}/${type}`),
            orderBy("finishedDate", "desc"),
            startAfter(lastDoc),
            limit(count)
          )
        : query(
            collection(firebase.firestore, `users/${user.uid}/${type}`),
            orderBy("finishedDate", "desc"),
            limit(count)
          )
    )
      .then(({ docs }) => {
        setLastDoc(docs[docs.length - 1]);
        setData((lastData) => [
          ...lastData,
          ...docs.map(
            (doc): TreeSummary => ({
              treeId: doc.id,
              summary: summarize(doc.data() as TreeMetadata) + doc.id,
              isPro: false,
            })
          ),
        ]);
        setHasMore(docs.length === count);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasMore(true);
        setIsLoading(false);
        throw error;
      });
  }, [
    user,
    lastDoc /* It's important to keep it here, so the callback is redefined based on the last doc */,
  ]);

  useEffect(() => {
    if (!user?.uid) return;

    /**
     * Fetch initial list values
     */
    fetchNextTrees();
  }, [user]);

  return {
    state: { data, isLoading, hasMore },
    actions: { fetchNextTrees },
  };
};
