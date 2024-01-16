import {
  collection,
  limit,
  query,
  startAfter,
  orderBy,
  getDocs,
  getDoc,
  doc,
  where,
} from "firebase/firestore";

import { summarize } from "../utils/summarize";
import { TreeSummary } from "../../../../../../types/treeSummary";

import { TreeMetadata } from "../../../../../../types/treeMetadata";
import { UserTreesClientDepsType } from "./types";

export const getTrees = async (
  deps: UserTreesClientDepsType,
  params: {
    lastTreeId?: string;
    count: number;
  },
): Promise<TreeSummary[]> => {
  const getUserTreeDocsQuery = params.lastTreeId
    ? query(
        collection(deps.firestore, `users/${deps.userId}/trees`),
        where("result", "!=", null),
        orderBy("result", "desc"),
        orderBy("finishedDate", "desc"),
        startAfter(
          await getDoc(
            doc(
              deps.firestore,
              `users/${deps.userId}/trees/${params.lastTreeId}`,
            ),
          ),
        ),
        limit(params.count),
      )
    : query(
        collection(deps.firestore, `users/${deps.userId}/trees`),
        where("result", "!=", null),
        orderBy("result", "desc"),
        orderBy("finishedDate", "desc"),
        limit(params.count),
      );

  const userTreeDocs = await getDocs(getUserTreeDocsQuery);

  return userTreeDocs.docs.map((doc) => ({
    treeId: doc.id,
    summary: summarize(doc.data() as TreeMetadata),
    planId: doc.data().planId,
  }));
};
