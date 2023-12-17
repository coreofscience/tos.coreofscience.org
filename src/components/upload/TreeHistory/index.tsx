import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import useUser from "../../../hooks/useUser";
import { useTrees } from "./hooks/useTrees";

import Loading from "./Loading";

const TreeHistory: FC = () => {
  const user = useUser();
  const proTrees = useTrees("proTrees", 3);
  const trees = useTrees("trees", 3);

  if (!user) return null;

  let allTrees = trees.state.data;
  if (user.plan === "pro") {
   allTrees = [...allTrees, ...proTrees.state.data]
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-2xl font-tall font-bold uppercase">
          Tree History ({user.plan === "pro" ? proTrees.state.data.length + trees.state.data.length : trees.state.data.length})
        </h2>
      </div>
      <div id="scrollableDiv" className="overflow-auto h-20">
        <InfiniteScroll
          dataLength={user.plan === "pro" ? proTrees.state.data.length + trees.state.data.length : trees.state.data.length}
          next={() => {
           if (user.plan === "pro") {
            if (proTrees.state.hasMore) {
             proTrees.actions.fetchNextTrees()
            }
            if (trees.state.hasMore) {
             trees.actions.fetchNextTrees()
            }
           } else {
            trees.actions.fetchNextTrees()
           }
          }}
          hasMore={user.plan === "pro" ? proTrees.state.hasMore || trees.state.hasMore : trees.state.hasMore}
          loader={<Loading user={user} proTrees={proTrees} trees={trees} />}
          endMessage={<p>No more data to load.</p>}
          scrollableTarget="scrollableDiv"
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
    </div>
  );
};

export default TreeHistory;
