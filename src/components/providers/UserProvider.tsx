import UserContext from "../../context/UserContext";
import useFirebase from "../../hooks/useFirebase";
import { UserContextType } from "../../types/userContextType";
import { onAuthStateChanged, User, IdTokenResult } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { FC, useEffect, useMemo, useState } from "react";

type UserProviderProps = {
  children?: React.ReactElement;
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
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
              plan:
                (idTokenResult.claims?.plan as "pro" | "basic" | undefined) ??
                "basic",
              emailVerified: user.emailVerified,
              acceptsEmail: userSnap.data()?.acceptsEmail,
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
