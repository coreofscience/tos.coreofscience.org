import { FirebaseContextType } from "../../../types/firebaseContext";
import { UserContextType } from "../../../types/userContextType";
import { addDoc, collection } from "firebase/firestore";

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

  const treesCollection = collection(
    firebase.firestore,
    user?.uid ? `users/${user.uid}/trees` : "trees",
  );
  const treeDoc = await addDoc(treesCollection, {
    files,
    createdDate: new Date().getTime(), // UTC timestamp.
    planId: user?.uid ? user.plan : null,
  });
  if (!treeDoc.path) {
    throw new Error("Failed creating a new document.");
  }
  return treeDoc.path;
};
