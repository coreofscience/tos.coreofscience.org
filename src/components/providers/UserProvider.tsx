import React, { FC, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, User, IdTokenResult } from "firebase/auth";
import UserContext from "../../context/UserContext";
import useFirebase from "../../hooks/useFirebase";
import { doc, getDoc } from "firebase/firestore";

import { UserContextType } from "../../types/userContextType";

interface Props {
  children?: React.ReactElement;
}

const UserProvider: FC<Props> = ({ children }: Props) => {
  const firebase = useFirebase();
  const [user, setUser] = useState<UserContextType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebase.auth,
      async (user: User | null) => {
        if (!user || !user.uid || !user.email) {
          // "close session" by removing the user from the context.
          setUser(null);
          return;
        }

        const userSnap = await getDoc(
          doc(firebase.firestore, `users/${user.uid}`),
        );

        user
          .getIdTokenResult()
          .then((idTokenResult: IdTokenResult) => {
            setUser({
              uid: user.uid,
              name: user.displayName ?? "",
              email: user.email ?? "",
              plan: idTokenResult.claims?.plan ?? "basic",
              emailVerified: user.emailVerified,
              acceptsEmail: userSnap.data()?.acceptsEmail ?? false,
            });
          })
          .catch((err) => {
            console.error("Error:", err);
            setUser({
              uid: user.uid,
              name: user.displayName ?? "",
              email: user.email ?? "",
              plan: "basic",
              emailVerified: user.emailVerified,
              acceptsEmail: false,
            });
          });
      },
    );

    return () => unsubscribe();
  }, [firebase.auth, firebase.firestore]);

  const userValue = useMemo(() => user, [user]);

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
