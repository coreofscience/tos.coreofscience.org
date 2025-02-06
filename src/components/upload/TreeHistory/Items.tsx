import useUser from "../../../hooks/useUser";
import { TreeSummary } from "../../../types/treeSummary";
import Button from "../../ui/Button";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  trees: TreeSummary[];
};

const Items: FC<Props> = ({ trees }) => {
  const user = useUser();

  if (!user) return null;

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
                  <span className="ml-2 flex-shrink-0 bg-leaf px-3 py-0.5 text-xs font-semibold text-slate-50">
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

export default Items;
