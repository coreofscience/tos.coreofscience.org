import useUser from "../../../hooks/useUser";
import { TreeMetadata } from "../../../types/treeMetadata";
import { mostCommon } from "../../../utils/arrays";
import Items from "./Items";
import { useTrees } from "./hooks/useTrees";
import { flatten } from "lodash";

const TREES_PER_PAGE = 500;

interface Props {
  userId: string;
}

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

const TreeHistory = ({ userId }: Props) => {
  const user = useUser();
  const trees = useTrees(userId, TREES_PER_PAGE);

  if (!user) return null;
  if (!trees.query.data?.length) return null;

  const data = trees.query.data.map((doc) => {
    const datum = doc.data() as TreeMetadata;
    return {
      treeId: doc.id,
      summary: summarize(datum),
      createdDate: datum.createdDate,
      planId: datum.planId,
    };
  });

  return (
    <div className="flex flex-col gap-3">
      {user.plan === "basic" ? (
        <ul className="flex flex-col gap-2">
          <Items trees={data.slice(3)} />
        </ul>
      ) : (
        <div className="flex flex-col gap-8">
          <ul className="flex flex-col gap-2">
            <Items trees={data} />
          </ul>
          {trees.hasNext && (
            <div>
              <button
                onClick={() => trees.fetchNextPage()}
                disabled={!trees.query.isLoading}
                className="rounded-sm bg-leaf px-4 py-2 font-tall font-bold uppercase text-slate-50"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeHistory;
