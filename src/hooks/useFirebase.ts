import { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";

const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default useFirebase;
