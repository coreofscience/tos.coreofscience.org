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
  const getCollectionPath = (user: UserContextType | null): string => {
    const paths: {[plan: string]: (uid: string) => string} = {
      pro: (uid: string): string => `users/${uid}/proTrees`,
      free: (uid: string): string => `users/${uid}/trees`,
      unregistered: (): string => "trees",
    }
    if (user) {
      return paths[user.plan](user.uid);
    }
    return paths.unregistered("");
  }

  const collectionPath = getCollectionPath(user);
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
