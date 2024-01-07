import { Link } from "react-router-dom";
import { FC } from "react";

import { TreeSummary } from "../../../types/treeSummary";
import useUser from "../../../hooks/useUser";

type Props = {
  trees: TreeSummary[];
};

const Items: FC<Props> = ({ trees }) => {
  const user = useUser();

  if (!user) return null;

  return (
    <>
      {trees.map(({ treeId, summary, planId }) => (
        <li key={treeId}>
          <Link
            className="text-sky-600 hover:text-sky-800 active:text-sky-800 transition-colors ease-in flex flex-row items-center h-5 mb-px"
            to={`/users/${user.uid}/trees/${treeId}`}
          >
            {summary?.keywords.join(", ") ?? ""}
            {planId === "pro" && (
              <span className="text-xs ml-2 px-3 py-0.5 bg-leaf text-slate-50 font-semibold flex-shrink-0">
                PRO
              </span>
            )}
          </Link>
        </li>
      ))}
    </>
  );
};

export default Items;
