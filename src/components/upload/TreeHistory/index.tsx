import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Query,
  DocumentData,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { flatten } from "lodash";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";

import { TreeMetadata } from "../../../types/treeMetadata";
import { TreeSummary } from "../../../types/treeSummary";

import { mostCommon } from "../../../utils/arrays";
import { Link } from "react-router-dom";
import { UserContextType } from "../../../types/userContextType";

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
  const [lastVisibleTree, setLastVisibleTree] = useState<QueryDocumentSnapshot | undefined>(undefined);
  const [lastVisibleProTree, setLastVisibleProTree] = useState<QueryDocumentSnapshot | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * Limite para el infinity scroll
   */
  const l: number = useMemo(() => {
    return 2
  }, [])

  const createQuery = useCallback((path: string, l: number, type?: "pro" | "basic" ): Query<DocumentData> | undefined => {
    if (!user) {
      return;
    }
    if (type === "pro" && lastVisibleProTree) {
      return query(
       collection(firebase.firestore, path),
       orderBy("finishedDate", "desc"),
       startAfter(lastVisibleProTree),
       limit(l),
      );
    }
    if (type === "basic" && lastVisibleTree) {
      return query(
       collection(firebase.firestore, path),
       orderBy("finishedDate", "desc"),
       startAfter(lastVisibleTree),
       limit(l),
      );
    }
    return query(
     collection(firebase.firestore, path),
     orderBy("finishedDate", "desc"),
     limit(l)
    );
  }, [firebase, user, lastVisibleTree, lastVisibleProTree])

  const fetchProTrees = useCallback(() => {
    if (!user || user.plan !== "pro") {
      return;
    }
    console.log("pro")
    const proTreesQuery = createQuery(`users/${user.uid}/proTrees`, l, "pro")
    if (!proTreesQuery) {
      return;
    }
    const unsubscribe = onSnapshot(proTreesQuery, (snapshot) => {
      setIsLoading(true)
      setLastVisibleProTree(snapshot.docs[snapshot.docs.length-1])
      const res = snapshot.docs.map((doc) => {
        return {
          treeId: doc.id,
          summary: summarize(doc.data() as TreeMetadata),
          isPro: true,
        }
      }).filter((tree) => !!tree.summary);
      if (res && res.length) {
        setProTrees([...proTrees, ...res]);
      }
      setIsLoading(false)
    });
    return () => unsubscribe()
  }, [user])

  const fetchTrees = useCallback(() => {
    if (!user) {
      return;
    }
    let treesQuery: Query<DocumentData> | undefined;
    if (user.plan !== "pro") {
      treesQuery = createQuery(`users/${user.uid}/trees`, 3)
    } else {
      treesQuery = createQuery(`users/${user.uid}/trees`, l, "basic")
    }
    if (!treesQuery) {
      return;
    }
    const unsubscribe = onSnapshot(treesQuery, (snapshot) => {
      setIsLoading(true)
      if (user.plan === "pro") {
        setLastVisibleTree(snapshot.docs[snapshot.docs.length-1])
      }
      const res = snapshot.docs.map((doc) => {
        return {
          treeId: doc.id,
          summary: summarize(doc.data() as TreeMetadata),
          isPro: false,
        }
      }).filter((tree) => !!tree.summary);
      if (res && res.length) {
        setTrees([...trees, ...res]);
      }
      setIsLoading(false)
    });
    return () => unsubscribe()
  }, [user])

  const fetchData = useCallback(() => {
    fetchTrees();
    fetchProTrees();
  }, [fetchTrees, fetchProTrees])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const allTrees = useMemo(() => [...proTrees, ...trees], [trees, proTrees]);

  if (allTrees.length === 0 || !user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-2xl font-tall font-bold uppercase">Tree History</h2>
      </div>
      <InfiniteScroll
       dataLength={allTrees.length}
       next={fetchData}
       hasMore={!!lastVisibleProTree || !!lastVisibleTree}
       loader={isLoading ? <p>loading...</p> : ''}
       endMessage={<p>No more data to load.</p>}
      >
        <ul>
          {allTrees.map(({ treeId, summary, isPro }) => (
           <li key={treeId}>
             {isPro ? (
              <Link
               className="text-sky-600 hover:text-sky-800 active:text-sky-800 transition-colors ease-in flex flex-row items-center"
               to={`/users/${user.uid}/proTrees/${treeId}`}
              >
                {summary}
                <span className="text-xs ml-2 px-3 py-0.5 bg-leaf text-slate-50 font-semibold flex-shrink-0">
                    PRO
                  </span>
              </Link>
             ) : (
              <Link
               className="text-sky-600 hover:text-sky-800 active:text-sky-800 transition-colors ease-in flex flex-row items-center"
               to={`/users/${user.uid}/trees/${treeId}`}
              >
                {summary}
              </Link>
             )}
           </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default TreeHistory;
