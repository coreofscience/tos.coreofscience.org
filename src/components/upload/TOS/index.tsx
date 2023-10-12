import React, { FC, useContext } from "react";
import { logEvent } from "firebase/analytics";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import FileContext from "../../../context/FileContext";

import useFiles from "../../../hooks/useFiles";
import useFirebase from "../../../hooks/useFirebase";

import computeQuantities from "../../../utils/computeQuantities";
import { countFormat, round, weightFormat } from "../../../utils/math";

import { createTree } from "./createTree";
import useUser from "../../../hooks/useUser";

import { UserContextType } from "../../../types/userContextType";
import EmailVerification from "../EmailVerification";
import AcceptsEmail from "../AcceptsEmail";

const FileDropper = React.lazy(() => import("../FileDropper"));
const UploadIndicator = React.lazy(() => import("../UploadIndicator"));
const FileErrors = React.lazy(() => import("../FileErrors"));
const TreeHistory = React.lazy(() => import("../TreeHistory"));

const hasFinished = (
  files: string[],
  progress: { [hash: string]: number },
): boolean =>
  files.reduce(
    (curr: boolean, hash: string) => curr && progress[hash] === 100,
    true,
  );

const TOS: FC = () => {
  const { progress } = useContext(FileContext);
  const files = useFiles();
  const hashes = files.map((file) => file.hash);
  const finished = hasFinished(hashes, progress);
  const firebase = useFirebase();
  const navigate = useNavigate();
  const user = useUser();

  const getMaxSize = (user: UserContextType | null) => {
    const maxSizeByUser: { [plan: string]: number } = {
      pro: 100,
      basic: 10,
      free: 5,
    };
    if (user) {
      return maxSizeByUser[user.plan];
    }
    return maxSizeByUser.free;
  };

  const maxSize: number = getMaxSize(user);
  const { totalArticles, totalCitations, articleCap, citationCap, sizeCap } =
    computeQuantities(files, maxSize);

  const {
    mutate: create,
    isLoading,
    isError,
  } = useMutation(createTree, {
    onSuccess: (treePath: string) => navigate(`/${treePath}`, { replace: true })
  });

  return (
    <div className="flex flex-col gap-4">
      {user && !user.emailVerified && <EmailVerification />}
      {user && <AcceptsEmail user={user} />}
      <div>
        <p>Get your seed files from web of knowledge.</p>
        <p>Then, upload your files for processing.</p>
      </div>
      <FileDropper maxSize={maxSize} />
      <UploadIndicator maxSize={maxSize} />
      <FileErrors />
      <p>Review your input:</p>
      <div className="grid grid-cols-articles gap-2 items-center">
        <div className="h-24 bg-slate-100 flex justify-center items-center flex-col">
          <span className="font-semibold text-xl">
            {countFormat.format(articleCap)}/{countFormat.format(totalArticles)}
          </span>
          <span className="text-slate-500 text-sm">articles</span>
        </div>
        <div className="h-24 bg-slate-100 flex justify-center items-center flex-col">
          <span className="font-semibold text-xl">
            {countFormat.format(citationCap)}/
            {countFormat.format(totalCitations)}
          </span>
          <span className="text-slate-500 text-sm">citations</span>
        </div>
        <div className="h-24 bg-slate-100 flex justify-center items-center flex-col">
          <span className="font-semibold text-xl">
            {weightFormat.format(round(sizeCap, 2))}/
            {weightFormat.format(round(maxSize, 2))}
          </span>
          <span className="text-slate-500 text-sm">size [MB]</span>
        </div>
      </div>
      <p>
        For extra processing capacity check out our&nbsp;
        <Link
          className="text-sky-600 hover:text-sky-800 active:text-sky-800 transition-colors ease-in"
          to="/pricing"
        >
          plans and pricing.
        </Link>
      </p>
      <br></br>
      <div>Time to create your Tree of Science.</div>
      <div>
        <button
          className="inline-block font-tall text-4xl text-slate-50 bg-leaf px-12 py-6 uppercase disabled:bg-slate-400"
          disabled={
            isLoading ||
            !finished ||
            totalArticles === 0 ||
            totalCitations === 0
          }
          onClick={() => {
            finished &&
              create({ firebase, files: files.map((file) => file.hash), user });
            logEvent(firebase.analytics, "tree_created");
          }}
        >
          {isLoading ? "LOADING..." : finished ? "CONTINUE" : "UPLOADING..."}
        </button>
      </div>
      {isError && (
        <div className="error">There was an error creating the your tree.</div>
      )}
      <TreeHistory />
    </div>
  );
};

export default TOS;
