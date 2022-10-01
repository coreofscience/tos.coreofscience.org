import { useContext } from "react";
import FirebaseContext from "../context/FirebaseContext";

const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  if (!firebase) {
    throw new Error(
      "useFirebase should be used within a FirebaseContext.Provider"
    );
  }
  return firebase;
};

export default useFirebase;
