import useFirebase from "../../hooks/useFirebase";
import { TreeMetadata } from "../../types/treeMetadata";
import { UserContextType } from "../../types/userContextType";
import { mostCommon } from "../../utils/arrays";
import Button from "../ui/Button";
import TreeHistoryItems from "./TreeHistoryItems";
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
import { flatten, sortBy } from "lodash";
import { useMemo, useState } from "react";

const TREES_PER_PAGE = 500;

type TreeHistoryProps = {
  user: UserContextType;
};

const summarize = (tree: TreeMetadata) => {
  if (!tree.result) {
    return null;
  }
  const { root, trunk, leaf } = tree.result;
  const allKeywords = flatten([
    ...root.map((node) => node.keywords),
    ...trunk.map((node) => node.keywords),
    ...leaf.map((node) => node.keywords),
  ]);
  return {
    keywords: mostCommon(
      allKeywords
        .filter((kw) => kw !== undefined)
        .map((kw) => (kw as string).toLowerCase()),
      4,
    ),
    createdDate: new Date(tree.createdDate),
  };
};

const getTrees = async (
  firestore: Firestore,
  userId: string,
  count: number,
) => {
  const treesQuery = query(
    collection(firestore, `users/${userId}/trees`),
    where("result", "!=", null),
    orderBy("result", "desc"),
    orderBy("finishedDate", "desc"),
    limit(count),
  );
  const result = await getDocs(treesQuery);
  return result.docs;
};

const TreeHistory = ({ user }: TreeHistoryProps) => {
  const firebase = useFirebase();
  const [limit, setLimit] = useState(25);

  const {
    data: trees,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["trees", user.uid, limit],
    queryFn: async () => {
      return getTrees(firebase.firestore, user.uid, limit);
    },
  });

  const hasNext = useMemo(
    () => !trees || (trees.length === limit && trees.length < TREES_PER_PAGE),
    [trees, limit],
  );

  const data = useMemo(
    () =>
      trees &&
      sortBy(
        trees.map((doc) => {
          const datum = doc.data() as TreeMetadata;
          return {
            treeId: doc.id,
            summary: summarize(datum),
            createdDate: datum.createdDate,
            planId: datum.planId,
          };
        }),
        (datum) => -datum.createdDate,
      ),
    [trees],
  );

  if (isLoading) return "Loading...";
  if (isError) return "There was an error loading your trees";
  if (!data) return "No trees found";

  return (
    <div className="flex flex-col gap-3">
      {user.plan === "basic" ? (
        <ul className="flex flex-col gap-2">
          <TreeHistoryItems user={user} trees={data.slice(0, 3)} />
        </ul>
      ) : (
        <div className="flex flex-col gap-8">
          <ul className="flex flex-col gap-2">
            <TreeHistoryItems user={user} trees={data} />
          </ul>
          {hasNext && (
            <div>
              <Button
                onClick={() =>
                  setLimit((prev) => Math.min(TREES_PER_PAGE, prev * 2))
                }
                disabled={isLoading}
                className="uppercase"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeHistory;
