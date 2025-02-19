import FileContext from "../../../context/FileContext";
import useFiles from "../../../hooks/useFiles";
import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";
import { FirebaseContextType } from "../../../types/firebaseContext";
import { UserContextType } from "../../../types/userContextType";
import computeQuantities from "../../../utils/computeQuantities";
import getMaxSize from "../../../utils/getMaxSize";
import { countFormat, round, weightFormat } from "../../../utils/math";
import Button from "../../ui/Button";
import AcceptsEmail from "../../upload/AcceptsEmail";
import EmailVerification from "../../upload/EmailVerification";
import { useMutation } from "@tanstack/react-query";
import { logEvent } from "firebase/analytics";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FileDropper = React.lazy(() => import("../../upload/FileDropper"));
const UploadIndicator = React.lazy(
  () => import("../../upload/UploadIndicator"),
);
const FileErrors = React.lazy(() => import("../../upload/FileErrors"));

const createTree = async ({
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

const hasFinished = (
  files: string[],
  progress: { [hash: string]: number },
): boolean =>
  files.reduce(
    (curr: boolean, hash: string) => curr && progress[hash] === 100,
    true,
  );

const Tos = () => {
  const { progress } = useContext(FileContext);
  const files = useFiles();
  const hashes = files.map((file) => file.hash);
  const finished = hasFinished(hashes, progress);
  const firebase = useFirebase();
  const navigate = useNavigate();
  const user = useUser();

  const maxSize: number = getMaxSize(user);
  const { totalArticles, totalCitations, articleCap, citationCap, sizeCap } =
    computeQuantities(files, maxSize);

  const {
    mutate: create,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createTree,
    onSuccess: (treePath: string) =>
      navigate(`/${treePath}`, { replace: true }),
  });

  return (
    <div className="flex flex-col gap-4">
      {user && !user.emailVerified && <EmailVerification />}
      {user && <AcceptsEmail user={user} />}
      <div>
        <p>Get your seed files from web of knowledge.</p>
        <p>Then, upload your files for processing.</p>
        <p>
          Do you want to{" "}
          <Button variant="link" size="link" asChild>
            <Link to="/tos/new">try something new?</Link>
          </Button>
        </p>
      </div>
      <FileDropper maxSize={maxSize} />
      <UploadIndicator maxSize={maxSize} />
      <FileErrors />
      <p>Review your input:</p>
      <div className="grid grid-cols-articles items-center gap-2">
        <div className="flex h-24 flex-col items-center justify-center rounded-xs bg-slate-100">
          <span className="text-xl font-semibold">
            {countFormat.format(articleCap)}/{countFormat.format(totalArticles)}
          </span>
          <span className="text-sm text-slate-500">articles</span>
        </div>
        <div className="flex h-24 flex-col items-center justify-center rounded-xs bg-slate-100">
          <span className="text-xl font-semibold">
            {countFormat.format(citationCap)}/
            {countFormat.format(totalCitations)}
          </span>
          <span className="text-sm text-slate-500">citations</span>
        </div>
        <div className="flex h-24 flex-col items-center justify-center rounded-xs bg-slate-100">
          <span className="text-xl font-semibold">
            {weightFormat.format(round(sizeCap, 2))}/
            {weightFormat.format(round(maxSize, 2))}
          </span>
          <span className="text-sm text-slate-500">size [MB]</span>
        </div>
      </div>
      {(!user || user.plan !== "pro") && (
        <p>
          For extra processing capacity check out our&nbsp;
          <Button variant="link" size="link" asChild>
            <Link to="/pricing">plans and pricing.</Link>
          </Button>
        </p>
      )}
      <br></br>
      <div>Let's start planting your tree.</div>
      <div>
        <Button
          className="uppercase"
          size="huge"
          disabled={
            isPending ||
            !finished ||
            totalArticles === 0 ||
            totalCitations === 0
          }
          onClick={() => {
            if (finished) {
              create({ firebase, files: files.map((file) => file.hash), user });
            }
            logEvent(firebase.analytics, "tree_created");
          }}
        >
          {isPending ? "loading..." : finished ? "continue" : "uploading..."}
        </Button>
      </div>
      {isError && (
        <div className="error">There was an error creating the your tree.</div>
      )}
      {user && (
        <div>
          <Button variant="link" size="link" asChild>
            <Link to="/history">Tree history</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tos;
