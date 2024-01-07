import { useEffect, useMemo, useState } from "react";

import useUser from "../../../../../hooks/useUser";
import useFirebase from "../../../../../hooks/useFirebase";

import { TreesClient } from "./client";

/**
 * Deals with user trees actions, such as retrieve them from the DB.
 * @returns defined client when the user is logged in and loaded.
 */
export const useTreesClient = () => {
  const user = useUser();
  const firebase = useFirebase();

  const userTreesClient = useMemo(
    () =>
      user?.uid
        ? TreesClient({ firestore: firebase.firestore, userId: user.uid })
        : null,
    [user, firebase]
  );

  return userTreesClient;
};
