import * as firebase from "firebase/app";
import "firebase/storage";

import { default as credentials } from "./credentials.json";

export const firebaseApp = firebase.initializeApp(credentials);
