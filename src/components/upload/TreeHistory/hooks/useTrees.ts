import useFirebase from "../../../../hooks/useFirebase";
import { useQuery } from "@tanstack/react-query";
import {
  Firestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";

const getQuery = (firestore: Firestore, userId: string, count: number) => {
  return query(
    collection(firestore, `users/${userId}/trees`),
    where("result", "!=", null),
    orderBy("result", "desc"),
    orderBy("finishedDate", "desc"),
    limit(count),
  );
};

export const useTrees = (userId: string, max: number) => {
  const firebase = useFirebase();
  const [limit, setLimit] = useState(25);
  const query = useQuery({
    queryKey: ["trees", limit],
    queryFn: async () => {
      const query = getQuery(firebase.firestore, userId, limit);
      return (await getDocs(query)).docs;
    },
  });
  return {
    query,
    fetchNextPage: () => {
      setLimit((prev) => Math.min(max, prev * 2));
    },
    hasNext:
      !query.data || (query.data.length === limit && query.data.length < max),
  };
};
