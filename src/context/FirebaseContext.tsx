import { createContext } from "react";
import { app } from "firebase/app";

const FirebaseContext = createContext<app.App | null>(null);
FirebaseContext.displayName = "FirebaseContext";

export default FirebaseContext;
