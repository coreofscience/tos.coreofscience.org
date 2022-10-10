import React, { FC, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

import FirebaseContext from "../../context/FirebaseContext";

import { FirebaseContextType } from "../../types/firebaseContext";

const CONFIG = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const FirebaseProvider: FC = ({ children }) => {
  const [app, setApp] = useState<FirebaseContextType | null>(null);

  useEffect(() => {
    const app = initializeApp(CONFIG);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const database = getDatabase(app);
    const storage = getStorage(app);
    const analytics = getAnalytics(app);

    setApp({ app, auth, firestore, database, storage, analytics });
  }, []);

  if (app === null) return <div>Loading...</div>;

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
