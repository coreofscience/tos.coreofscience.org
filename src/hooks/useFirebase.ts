import { useContext } from "react";
import FirebaseContext from "../context/FirebaseContext";

export const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  if (!firebase) {
    throw new Error("Unable to setup firebase context");
  }
  return firebase;
};
