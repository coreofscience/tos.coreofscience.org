import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Query,
  startAfter,
  endBefore,
  DocumentData,
  QueryDocumentSnapshot,
  getDocs,
} from "firebase/firestore";
import { flatten } from "lodash";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import Table from "./Table";

import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";

import { TreeMetadata } from "../../../types/treeMetadata";
import { TreeSummary } from "../../../types/treeSummary";

import { mostCommon } from "../../../utils/arrays";

const summarize = (tree: TreeMetadata): string => {
  if (!tree.result) {
    return "";
  }
  const { root, trunk, leaf } = tree.result;
  const allKeywords = flatten([
    ...root.map((node) => node.keywords),
    ...trunk.map((node) => node.keywords),
    ...leaf.map((node) => node.keywords),
  ]);

  return mostCommon(
    allKeywords
      .filter((kw) => kw !== undefined)
      .map((kw) => (kw as string).toLowerCase()),
    4,
  ).join(", ");
};

const TreeHistory: FC = () => {
  const firebase = useFirebase();
  const user = useUser();

  const [trees, setTrees] = useState<TreeSummary[]>([]);
  const [proTrees, setProTrees] = useState<TreeSummary[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previousPage, setPreviousPage] = useState<number>(1);
  const [lastVisibleTree, setLastVisibleTree] = useState<QueryDocumentSnapshot | undefined>(undefined);
  const [lastVisibleProTree, setLastVisibleProTree] = useState<QueryDocumentSnapshot | undefined>(undefined);
  const [firstVisibleTree, setFirstVisibleTree] = useState<QueryDocumentSnapshot | undefined>(undefined);
  const [firstVisibleProTree, setFirstVisibleProTree] = useState<QueryDocumentSnapshot | undefined>(undefined);
  const [isAlreadyLastPageTree, setIsAlreadyLastPageTree] = useState<boolean>(false)
  const [isAlreadyLastPageProTree, setIsAlreadyLastPageProTree] = useState<boolean>(false)

  const l: number = useMemo(() => {
    return 2
  }, [])

  const createQuery = useCallback((path: string, l: number, lastVisible?: QueryDocumentSnapshot<DocumentData>, firstVisible?: QueryDocumentSnapshot<DocumentData>): Query<DocumentData> | null => {
    if (!user) {
      return null;
    }
    if (user.plan !== "pro" || !lastVisible) {
      return query(
       collection(firebase.firestore, path),
       orderBy("finishedDate", "desc"),
       limit(l)
      );
    }
    if (previousPage > currentPage) {
      if (firstVisible) {
        return query(
         collection(firebase.firestore, path),
         orderBy("finishedDate", "desc"),
         endBefore(firstVisible),
         limit(l)
        );
      }
      return query(
       collection(firebase.firestore, path),
       orderBy("finishedDate", "desc"),
       limit(l)
      );
    }
    if (lastVisible) {
      return query(
       collection(firebase.firestore, path),
       orderBy("finishedDate", "desc"),
       startAfter(lastVisible),
       limit(l)
      );
    }
    return null;
  }, [firebase, user, previousPage, currentPage])

  useEffect(() => {
    if (!user) {
      return;
    }
    let treesQuery: Query<DocumentData> | null;
    if (user.plan !== "pro") {
      treesQuery = createQuery(`users/${user.uid}/trees`, 3)
    } else {
      treesQuery = createQuery(`users/${user.uid}/trees`, l, lastVisibleTree, firstVisibleTree)
    }
    if (!treesQuery) {
      return;
    }
    return onSnapshot(treesQuery, (snapshot) => {
      if (user.plan === "pro") {
        if (l > snapshot.docs.length) {
          setIsAlreadyLastPageProTree(true)
          return
        }
        setLastVisibleTree(snapshot.docs[snapshot.docs.length-1])
        setFirstVisibleTree(snapshot.docs[0])
      }
      const res = snapshot.docs.map((doc) => {
        return {
          treeId: doc.id,
          summary: summarize(doc.data() as TreeMetadata),
          isPro: false,
        }
      }).filter((tree) => !!tree.summary);
      if ((!res || res.length === 0 || l > res.length) && user.plan === "pro") {
        setIsAlreadyLastPageTree(true)
      } else {
        setIsAlreadyLastPageTree(false)
      }
      if (res && res.length) {
        setTrees(res);
      }
    });
  }, [firebase, user, currentPage]);

  useEffect(() => {
    if (!user || user.plan !== "pro") {
      return;
    }
    const proTreesQuery = createQuery(
     `users/${user.uid}/proTrees`,
     l,
     lastVisibleProTree,
     firstVisibleProTree,
    )
    if (!proTreesQuery) {
      return;
    }
    return onSnapshot(proTreesQuery, (snapshot) => {
      setLastVisibleProTree(snapshot.docs[snapshot.docs.length-1])
      setFirstVisibleProTree(snapshot.docs[0])
      const res = snapshot.docs.map((doc) => {
         return {
           treeId: doc.id,
           summary: summarize(doc.data() as TreeMetadata),
           isPro: true,
         }
       }).filter((tree) => !!tree.summary);
      if (!res || res.length === 0 || l > res.length) {
        setIsAlreadyLastPageProTree(true)
      } else {
        setIsAlreadyLastPageProTree(false)
      }
      if (res && res.length) {
        setProTrees(res);
      }
    });
  }, [firebase, user, currentPage]);

  const allTrees = useMemo(() => [...proTrees, ...trees], [trees, proTrees]);

  if (allTrees.length === 0 || !user) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setPreviousPage(currentPage)
    }
  }

  const handleNext = () => {
    if (currentPage >= 1 &&
     (lastVisibleTree || lastVisibleProTree) &&
     !isAlreadyLastPageProTree &&
     !isAlreadyLastPageTree) {
      setPreviousPage(currentPage)
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-2xl font-tall font-bold uppercase">Tree History</h2>
      </div>
      <Table
       allTrees={allTrees}
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
       handlePrevious={handlePrevious}
       handleNext={handleNext}
       isAlreadyLastPageTree={isAlreadyLastPageTree}
       isAlreadyLastPageProTree={isAlreadyLastPageProTree}
      />
    </div>
  );
};

export default TreeHistory;
