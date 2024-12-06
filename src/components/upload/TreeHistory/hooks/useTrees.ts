import useFirebase from "../../../../hooks/useFirebase";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  DocumentReference,
  Firestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

const getQuery = (
  firestore: Firestore,
  userId: string,
  pageParam: DocumentReference | null,
  count: number,
) => {
  return pageParam !== null
    ? query(
        collection(firestore, `users/${userId}/trees`),
        where("result", "!=", null),
        orderBy("result", "desc"),
        orderBy("finishedDate", "desc"),
        startAfter(pageParam),
        limit(count),
      )
    : query(
        collection(firestore, `users/${userId}/trees`),
        where("result", "!=", null),
        orderBy("result", "desc"),
        orderBy("finishedDate", "desc"),
        limit(count),
      );
};

export const useTrees = (userId: string, count: number) => {
  const firebase = useFirebase();
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["trees"],
    queryFn: async ({ pageParam }: { pageParam: DocumentReference | null }) => {
      // Fetch the data
      const query = getQuery(firebase.firestore, userId, pageParam, count);
      return (await getDocs(query)).docs;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const lastDoc = lastPage ? lastPage[lastPage.length - 1].ref : null;
      return lastDoc;
    },
  });
  return infiniteQuery;
};
