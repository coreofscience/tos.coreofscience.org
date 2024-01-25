import useUser from "../../../hooks/useUser";
import Items from "./Items";
import { useTrees } from "./hooks/useTrees";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const TREES_PER_PAGE = 5;
const TREE_ELEMENT_HEIGHT = 23.5;

const TreeHistory: FC = () => {
  const user = useUser();
  const trees = useTrees(TREES_PER_PAGE);

  if (!user) return null;
  if (!trees.state.data.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="font-tall text-2xl font-bold uppercase">Tree History</h2>
      </div>
      {user.plan === "basic" ? (
        <ul>
          <Items trees={trees.state.data} />
        </ul>
      ) : (
        <InfiniteScroll
          dataLength={trees.state.data.length}
          next={trees.actions.fetchNextTrees}
          hasMore={trees.state.hasMore}
          loader={trees.state.status === "loading" && <p>Loading...</p>}
          height={TREE_ELEMENT_HEIGHT * (TREES_PER_PAGE - 1)}
        >
          <ul>
            <Items trees={trees.state.data} />
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default TreeHistory;
