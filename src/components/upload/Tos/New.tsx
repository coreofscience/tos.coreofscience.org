/**
 * Create trees from search queries.
 */
import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";
import { createOpenAlexTree } from "./createTree";
import { useMutation } from "@tanstack/react-query";
import { logEvent } from "firebase/analytics";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          create({ firebase, search, user });
          logEvent(firebase.analytics, "openalex_tree_created");
        }}
      >
        <input
          className="rounded-sm px-6 py-3 text-xl ring-1 ring-slate-400 focus:ring-leaf focus:outline-2 focus:outline-none"
          name="search"
          type="text"
          placeholder="bit patterned media OR bit patterned magnetic recording"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isPending}
        ></input>
        <div className="flex flex-row items-center justify-center">
          <button
            className="rounded-sm bg-leaf px-8 py-4 font-tall text-2xl uppercase text-slate-50 disabled:bg-slate-400"
            type="submit"
            disabled={isPending || !search}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default New;
