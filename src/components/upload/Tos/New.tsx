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
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          create({ firebase, search, user });
          logEvent(firebase.analytics, "openalex_tree_created");
        }}
      >
        <input
          name="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isPending}
        ></input>
        <button type="submit" disabled={isPending}>
          Create
        </button>
      </form>
    </div>
  );
};

export default New;
