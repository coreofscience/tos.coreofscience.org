import {
  collection,
  limit,
  query,
  startAfter,
  orderBy,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

import { summarize } from "../utils/summarize";
import { TreeSummary } from "../../../../../../types/treeSummary";

import { TreeMetadata } from "../../../../../../types/treeMetadata";
import { UserTreesClientDepsType } from "./types";

export const getTrees = async (
  deps: UserTreesClientDepsType,
  params: {
    lastTreeId?: string;
    type: "proTrees" | "trees";
    count: number;
  }
): Promise<TreeSummary[]> => {
  const getUserTreeDocsQuery = params.lastTreeId
    ? query(
        collection(deps.firestore, `users/${deps.userId}/${params.type}`),
        orderBy("finishedDate", "desc"),
        startAfter(
          await getDoc(
            doc(
              deps.firestore,
              `users/${deps.userId}/${params.type}/${params.lastTreeId}`
            )
          )
        ),
        limit(params.count)
      )
    : query(
        collection(deps.firestore, `users/${deps.userId}/${params.type}`),
        orderBy("finishedDate", "desc"),
        limit(params.count)
      );

  const userTreeDocs = await getDocs(getUserTreeDocsQuery);

  return userTreeDocs.docs.map((doc) => {
    const data = doc.data() as TreeMetadata;
    return {
      treeId: doc.id,
      summary: summarize(data),
      createdDate: data.createdDate,
      isPro: params.type === "proTrees",
    };
  });
};
