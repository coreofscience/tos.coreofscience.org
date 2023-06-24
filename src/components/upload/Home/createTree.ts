import { addDoc, collection } from "firebase/firestore";
import { FirebaseContextType } from "../../../types/firebaseContext";
import { UserContextType } from "../../../types/userContextType";

export const createTree = async ({
  firebase,
  files,
  user,
}: {
  firebase: FirebaseContextType;
  files: string[];
  user: UserContextType | null;
}): Promise<string> => {
  if (!files.length) {
    throw new Error("Files cannot be empty.");
  }
  const collectionPath = user === null ? "trees" : `users/${user.uid}/trees`;
  const treesCollection = collection(firebase.firestore, collectionPath);
  const treeDoc = await addDoc(treesCollection, {
    files,
    createdDate: new Date().getTime(), // UTC timestamp.
  });
  if (!treeDoc.path) {
    throw new Error("Failed creating a new document.");
  }
  return treeDoc.path;
};
