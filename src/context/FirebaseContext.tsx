import { createContext } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Analytics, getAnalytics } from "firebase/analytics";

export type FirebaseContextType = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
  analytics: Analytics;
};

const app = initializeApp({
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASEURL,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
});
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

const FirebaseContext = createContext<FirebaseContextType>({
  app,
  auth,
  firestore,
  storage,
  analytics,
});
FirebaseContext.displayName = "FirebaseContext";

export { FirebaseContext };
