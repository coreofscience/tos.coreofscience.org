import { createContext } from "react";
import { FirebaseContextType } from "../types/firebaseContext";

const FirebaseContext = createContext<FirebaseContextType | null>(null);
FirebaseContext.displayName = "FirebaseContext";

export default FirebaseContext;
