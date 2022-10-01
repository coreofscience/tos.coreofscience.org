import { ref, push } from "firebase/database";
import { FirebaseContextType } from "../../../types/firebaseContext";

type ParamsType = {
  firebase: FirebaseContextType;
  files: string[];
};

export const createTree = async ({
  firebase,
  files,
}: ParamsType): Promise<string> => {
  if (!files.length) {
    throw new Error("Files cannot be empty.");
  }

  const treesCollection = ref(firebase.database, "trees");

  const result = await push(treesCollection, {
    files,
    createdDate: new Date().getTime(),
  });

  if (!result.key) {
    throw new Error("Failed to retrieve a new key.");
  }

  return result.key;
};
