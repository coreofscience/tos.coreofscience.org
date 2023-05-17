import React, { FC, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import UserContext from "../../context/UserContext";
import useFirebase from "../../hooks/useFirebase";

import { UserContextType } from "../../types/userContextType";

interface Props {
  children?: React.ReactElement;
}

const UserProvider: FC<Props> = ({ children }: Props) => {
  const firebase = useFirebase();
  const [user, setUser] = useState<UserContextType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      if (!user || !user.uid || !user.email) {
        // "close session" by removing the user from the context.
        setUser(null);
        return;
      }

      setUser({
        uid: user.uid,
        name: user?.displayName ?? "",
        email: user.email,
      });
    });
    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
