import React, { FC, ReactNode, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

import FirebaseContext from "../../context/FirebaseContext";

import { FirebaseContextType } from "../../types/firebaseContext";

const CONFIG = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASEURL,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

const FirebaseProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [app, setApp] = useState<FirebaseContextType | null>(null);

  useEffect(() => {
    const app = initializeApp(CONFIG);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const storage = getStorage(app);
    const analytics = getAnalytics(app);

    setApp({ app, auth, firestore, storage, analytics });
  }, []);

  if (app === null) return <div>Loading...</div>;

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
