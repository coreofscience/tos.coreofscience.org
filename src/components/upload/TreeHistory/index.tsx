import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Items from "./Items";

import useUser from "../../../hooks/useUser";
import { useTrees } from "./hooks/useTrees";

const TreeHistory: FC = () => {
  const user = useUser();
  const trees = useTrees(3);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-2xl font-tall font-bold uppercase">
          Tree History ({trees.state.data.length})
        </h2>
      </div>
      <div id="scrollableDiv" className="overflow-auto h-20">
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
          endMessage={<p>No more data to load.</p>}
          scrollableTarget="scrollableDiv"
         >
          <ul>
           <Items trees={trees.state.data} />
          </ul>
        </InfiniteScroll>
       )}
      </div>
    </div>
  );
};

export default TreeHistory;
