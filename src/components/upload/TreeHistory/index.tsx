import useUser from "../../../hooks/useUser";
import { TreeMetadata } from "../../../types/treeMetadata";
import { mostCommon } from "../../../utils/arrays";
import Items from "./Items";
import { useTrees } from "./hooks/useTrees";
import { flatten } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const TREES_PER_PAGE = 5;
const TREE_ELEMENT_HEIGHT = 23.5;

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
  if (!trees.data?.pages.length) return null;

  const data = trees.data.pages
    .map((page) => page)
    .flat()
    .map((doc) => ({
      treeId: doc.id,
      summary: summarize(doc.data() as TreeMetadata),
      planId: doc.data().planId,
    }));

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="font-tall text-2xl font-bold uppercase">Tree History</h2>
      </div>
      {user.plan === "basic" ? (
        <ul>
          <Items trees={data} />
        </ul>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={trees.fetchNextPage}
          hasMore={trees.hasNextPage}
          loader={trees.isLoading && <p>Loading...</p>}
          height={TREE_ELEMENT_HEIGHT * (TREES_PER_PAGE - 1)}
        >
          <ul>
            <Items trees={data} />
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default TreeHistory;
