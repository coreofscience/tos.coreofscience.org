import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { flatten } from "lodash";
import { FC, useEffect, useState } from "react";
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

const TreeHistory: FC = () => {
  const firebase = useFirebase();
  const [trees, setTrees] = useState<{ treeId: string; summary: string }[]>([]);
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
    const unsubscribe = onSnapshot(treesQuery, (snapshot) => {
      setTrees(
        snapshot.docs.map((doc) => ({
          treeId: doc.id,
          summary: summarize(doc.data() as TreeMetadata),
        }))
      );
    });
    return unsubscribe;
  }, [firebase, user]);

  if (trees.length === 0 || !user) {
    return null;
  }

  return (
    <div className="treeHistory">
      <div className="treeHistory__header">
        <h2 className="treeHistory__title">Tree History</h2>
      </div>
      <div className="treeHistory__body">
        <ul>
          {trees.map(({ treeId, summary }) => (
            <li key={treeId}>
              <Link to={`/users/${user.uid}/trees/${treeId}`}>{summary}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TreeHistory;
