import React, { FC, ReactNode, useEffect, useState } from "react";
import firebase from "firebase/app";

import FirebaseContext from "../../context/firebase";

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

interface Props {
  children?: ReactNode;
}

const FirebaseProvider: FC<Props> = ({ children }: Props) => {
  const [app, setApp] = useState<firebase.app.App | null>(null);

  useEffect(() => {
    try {
      setApp(firebase.app());
    } catch {
      setApp(firebase.initializeApp(CONFIG));
    }
  }, []);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
