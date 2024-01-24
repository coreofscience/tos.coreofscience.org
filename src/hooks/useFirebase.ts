import { FirebaseContext } from "../context/FirebaseContext";
import { useContext } from "react";

const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default useFirebase;
