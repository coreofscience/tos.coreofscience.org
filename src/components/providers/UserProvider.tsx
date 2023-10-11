import React, { FC, useEffect, useMemo, useState } from "react";
import { IdTokenResult, onAuthStateChanged, User } from "firebase/auth";
import UserContext from "../../context/UserContext";
import useFirebase from "../../hooks/useFirebase";
import { doc, onSnapshot } from "firebase/firestore";

import { UserContextType } from "../../types/userContextType";

interface Props {
  children?: React.ReactElement;
}

const UserProvider: FC<Props> = ({ children }: Props) => {
  const firebase = useFirebase();
  const [acceptsEmail, setAcceptsEmail] = useState<boolean | undefined>(
    false,
  );
  const [user, setUser] = useState<UserContextType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebase.auth,
      (user: User | null) => {
        if (!user || !user.uid || !user.email) {
          // "close session" by removing the user from the context.
          setUser(null);
          return;
        }

        user
          .getIdTokenResult()
          .then((idTokenResult: IdTokenResult) => {
            setUser({
              uid: user.uid,
              name: user.displayName ?? "",
              email: user.email ?? "",
              plan: idTokenResult.claims?.plan ?? "basic",
              emailVerified: user.emailVerified,
              acceptsEmail: false,
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
  }, []);

  useEffect(() => {
    if (!user || !user.uid) {
      return;
    }
    return onSnapshot(
      doc(firebase.firestore, `users/${user.uid}`),
      (doc) => {
       setAcceptsEmail(doc.get("acceptsEmail"));
      },
     );
  }, [user, firebase.firestore]);

  const userValue = useMemo<UserContextType | null>(
    () => {
      if (user) return { ...user, acceptsEmail } as UserContextType
      return null
    },
    [user, acceptsEmail],
  );

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
