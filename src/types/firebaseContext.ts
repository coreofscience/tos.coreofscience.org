import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Database } from "firebase/database";
import { FirebaseStorage } from "firebase/storage";
import { Analytics } from "firebase/analytics";

export type FirebaseContextType = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  database: Database;
  storage: FirebaseStorage;
  analytics: Analytics;
};
