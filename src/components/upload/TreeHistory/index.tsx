import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import useUser from "../../../hooks/useUser";

import { useTrees } from "./hooks/useTrees";

const TreeHistory: FC = () => {
  const user = useUser();
  const trees = useTrees("proTrees", 3);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-2xl font-tall font-bold uppercase">
          Tree History ({trees.state.data.length})
        </h2>
      </div>
      <div id="scrollableDiv" style={{ height: 60, overflow: "auto" }}>
        <InfiniteScroll
          dataLength={trees.state.data.length}
          next={trees.actions.fetchNextTrees}
          hasMore={trees.state.hasMore}
          loader={trees.state.isLoading ? <p>loading...</p> : ""}
          endMessage={<p>No more data to load.</p>}
          scrollableTarget="scrollableDiv"
        >
          <ul>
            {trees.state.data.map(({ treeId, summary, isPro }) => (
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
    </div>
  );
};

export default TreeHistory;
