import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { flatten } from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";
import { TreeMetadata } from "../../../types/treeMetadata";
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
    4
  ).join(", ");
};

type TreeSummary = {
  treeId: string;
  summary: string;
  isPro: boolean;
};

const TreeHistory: FC = () => {
  const firebase = useFirebase();
  const [trees, setTrees] = useState<TreeSummary[]>([]);
  const [proTrees, setProTrees] = useState<TreeSummary[]>([]);
  const user = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }
    const treesQuery = query(
      collection(firebase.firestore, `users/${user.uid}/trees`),
      orderBy("finishedDate", "desc"),
      limit(3)
    );
    return onSnapshot(treesQuery, (snapshot) => {
      setTrees(
       snapshot.docs.map((doc) => ({
         treeId: doc.id,
         summary: summarize(doc.data() as TreeMetadata),
         isPro: false,
       }))
      );
    });
  }, [firebase, user]);

  useEffect(() => {
    if (!user || user.plan !== "pro") {
      return;
    }
    const proTreesQuery = query(
      collection(firebase.firestore, `users/${user.uid}/proTrees`),
      orderBy("finishedDate", "desc"),
      limit(3)
    );
    return onSnapshot(proTreesQuery, (snapshot) => {
      setProTrees(
       snapshot.docs.map((doc) => ({
         treeId: doc.id,
         summary: summarize(doc.data() as TreeMetadata),
         isPro: true,
       }))
      );
    });
  }, [firebase, user]);

  const allTrees = useMemo(() => [...proTrees, ...trees], [trees, proTrees]);

  if (allTrees.length === 0 || !user) {
    return null;
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl font-tall font-bold uppercase">Tree History</h2>
      </div>
      <div>
        <ul>
          {allTrees.map(({ treeId, summary, isPro }) => (
            <li className="list-disc pb-1" key={treeId}>
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
      </div>
    </div>
  );
};

export default TreeHistory;
