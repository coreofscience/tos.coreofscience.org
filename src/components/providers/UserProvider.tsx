import React, { FC, useEffect, useState } from "react";
import { onAuthStateChanged, User, IdTokenResult } from "firebase/auth";
import UserContext from "../../context/UserContext";
import useFirebase from "../../hooks/useFirebase";
import { getDoc, doc } from "firebase/firestore";

import { UserContextType } from "../../types/userContextType";

interface Props {
  children?: React.ReactElement;
}

const UserProvider: FC<Props> = ({ children }: Props) => {
  const firebase = useFirebase();
  const [user, setUser] = useState<UserContextType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user: User | null) => {
      if (!user || !user.uid || !user.email) {
        // "close session" by removing the user from the context.
        setUser(null);
        return;
      }

      user.getIdTokenResult()
        .then((idTokenResult: IdTokenResult) => {
          getDoc(doc(firebase.firestore, `users/${user.uid}`))
           .then((res) => {
             setUser({
               uid: user.uid,
               name: user.displayName ?? "",
               email: user.email ?? "",
               plan: idTokenResult.claims?.plan ?? "basic",
               acceptsEmail: res.get("acceptsEmail"),
             });
           })
           .catch((err) => {
             console.error("Error:", err);
             setUser({
               uid: user.uid,
               name: user.displayName ?? "",
               email: user.email ?? "",
               plan: idTokenResult.claims?.plan ?? "basic",
             });
           });
        })
        .catch((err) => {
          console.error("Error:", err);
          setUser({
            uid: user.uid,
            name: user.displayName ?? "",
            email: user.email ?? "",
            plan: "basic",
          });
        });
    });
    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
