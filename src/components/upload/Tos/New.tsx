/**
 * Create trees from search queries.
 */
import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";
import Button from "../../ui/Button";
import { createOpenAlexTree } from "./createTree";
import { useMutation } from "@tanstack/react-query";
import { logEvent } from "firebase/analytics";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const New = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const firebase = useFirebase();
  const user = useUser();

  const { mutate: create, isPending } = useMutation({
    mutationFn: createOpenAlexTree,
    onSuccess: (treePath: string) =>
      navigate(`/${treePath}`, { replace: true }),
  });

  return (
    <div className="flex flex-col gap-8">
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          create({ firebase, search, user });
          logEvent(firebase.analytics, "openalex_tree_created");
        }}
      >
        <input
          className="rounded-sm px-6 py-3 text-xl ring-1 ring-slate-400 focus:outline-none focus:outline-2 focus:ring-leaf"
          name="search"
          type="text"
          placeholder="bit patterned media OR bit patterned magnetic recording"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isPending}
        ></input>
        <p className="text-center">
          <small className="text-slate-600">
            Your search will be executed in{" "}
            <Button variant="link" size="link" asChild>
              <a
                href="https://openalex.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenAlex
              </a>
            </Button>{" "}
            before processing.
          </small>{" "}
          {(!user || user.plan !== "pro") && (
            <small className="text-slate-600">
              Works better using the pro plan, see{" "}
              <Button variant="link" size="link" asChild>
                <Link to="/pricing">plans and pricing.</Link>
              </Button>
            </small>
          )}
        </p>
        <div className="flex flex-row items-center justify-center">
          <Button
            className="uppercase"
            size="huge"
            type="submit"
            disabled={isPending || !search}
          >
            Create
          </Button>
        </div>
      </form>
      {user && (
        <div className="flex flex-row items-center justify-center">
          <Button variant="link" size="link" asChild>
            <Link to="/history">Tree History</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default New;
