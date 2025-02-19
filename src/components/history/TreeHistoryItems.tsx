import { TreeSummary } from "../../types/treeSummary";
import { UserContextType } from "../../types/userContextType";
import Button from "../ui/Button";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

type TreeHistoryItemsProps = {
  trees: TreeSummary[];
  user: UserContextType;
};

const TreeHistoryItems: FC<TreeHistoryItemsProps> = ({ trees, user }) => {
  return (
    <>
      {trees.map(({ treeId, summary, planId, createdDate }) => {
        const createdTime = moment(createdDate);
        return (
          <li className="flex flex-row gap-2" key={treeId}>
            <time dateTime={createdTime.format()} title={createdTime.format()}>
              {createdTime.calendar()}
            </time>
            <Button variant="link" size="link" asChild>
              <Link to={`/users/${user.uid}/trees/${treeId}`}>
                {summary?.keywords.join(", ") ?? ""}
                {planId === "pro" && (
                  <span className="ml-2 shrink-0 bg-leaf px-3 py-1 text-xs font-semibold text-slate-50">
                    PRO
                  </span>
                )}
              </Link>
            </Button>
          </li>
        );
      })}
    </>
  );
};

export default TreeHistoryItems;
