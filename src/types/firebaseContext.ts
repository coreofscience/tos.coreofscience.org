import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";

export type FirebaseContextType = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
  analytics: Analytics;
};
