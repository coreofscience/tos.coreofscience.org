import FileContext from "../../../context/FileContext";
import useFiles from "../../../hooks/useFiles";
import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";
import computeQuantities from "../../../utils/computeQuantities";
import getMaxSize from "../../../utils/getMaxSize";
import { countFormat, round, weightFormat } from "../../../utils/math";
import AcceptsEmail from "../AcceptsEmail";
import EmailVerification from "../EmailVerification";
import { createTree } from "./createTree";
import { useMutation } from "@tanstack/react-query";
import { logEvent } from "firebase/analytics";
import React, { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

const Tos: FC = () => {
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
          <Link
            className="text-sky-600 transition-colors ease-in hover:text-sky-800 active:text-sky-800"
            to="/tos/new"
          >
            try something new?
          </Link>
        </p>
      </div>
      <FileDropper maxSize={maxSize} />
      <UploadIndicator maxSize={maxSize} />
      <FileErrors />
      <p>Review your input:</p>
      <div className="grid grid-cols-articles items-center gap-2">
        <div className="flex h-24 flex-col items-center justify-center rounded-sm bg-slate-100">
          <span className="text-xl font-semibold">
            {countFormat.format(articleCap)}/{countFormat.format(totalArticles)}
          </span>
          <span className="text-sm text-slate-500">articles</span>
        </div>
        <div className="flex h-24 flex-col items-center justify-center rounded-sm bg-slate-100">
          <span className="text-xl font-semibold">
            {countFormat.format(citationCap)}/
            {countFormat.format(totalCitations)}
          </span>
          <span className="text-sm text-slate-500">citations</span>
        </div>
        <div className="flex h-24 flex-col items-center justify-center rounded-sm bg-slate-100">
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
          <Link
            className="text-sky-600 transition-colors ease-in hover:text-sky-800 active:text-sky-800"
            to="/pricing"
          >
            plans and pricing.
          </Link>
        </p>
      )}
      <br></br>
      <div>Let's start planting your tree.</div>
      <div>
        <button
          className="inline-block rounded-sm bg-leaf px-12 py-6 font-tall text-4xl uppercase text-slate-50 disabled:bg-slate-400"
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
          {isPending ? "LOADING..." : finished ? "CONTINUE" : "UPLOADING..."}
        </button>
      </div>
      {isError && (
        <div className="error">There was an error creating the your tree.</div>
      )}
      <TreeHistory />
    </div>
  );
};

export default Tos;
