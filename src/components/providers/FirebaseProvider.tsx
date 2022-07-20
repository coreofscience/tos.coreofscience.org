import { FC, ReactNode, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";
import "firebase/analytics";

import FirebaseContext from "../../context/FirebaseContext";

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
    firebase.analytics();
  }, []);

  if (app === null) return <div>Loading...</div>;

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
