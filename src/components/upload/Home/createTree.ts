import { addDoc, collection } from "firebase/firestore";
import { FirebaseContextType } from "../../../types/firebaseContext";

export const createTree = async ({
  firebase,
  files,
}: {
  firebase: FirebaseContextType;
  files: string[];
}): Promise<string> => {
  if (!files.length) {
    throw new Error("Files cannot be empty.");
  }

  const treesCollection = collection(firebase.firestore, "trees");

  const treeDoc = await addDoc(treesCollection, {
    files,
    createdDate: new Date().getTime(), // UTC timestamp.
  });

  if (!treeDoc.id) {
    throw new Error("Failed creating a new document.");
  }

  return treeDoc.id;
};
