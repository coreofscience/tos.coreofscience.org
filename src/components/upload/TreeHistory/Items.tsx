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
            className="mb-px flex h-5 flex-row items-center text-sky-600 transition-colors ease-in hover:text-sky-800 active:text-sky-800"
            to={`/users/${user.uid}/trees/${treeId}`}
          >
            {summary?.keywords.join(", ") ?? ""}
            {planId === "pro" && (
              <span className="ml-2 flex-shrink-0 bg-leaf px-3 py-0.5 text-xs font-semibold text-slate-50">
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
