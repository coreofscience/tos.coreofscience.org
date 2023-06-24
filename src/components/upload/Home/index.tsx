import { FC, Fragment, useContext } from "react";
import { logEvent } from "firebase/analytics";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

import "./Home.css";
import FileContext from "../../../context/FileContext";
import FileDropper from "../FileDropper";
import UploadIndicator from "../UploadIndicator";
import FileErrors from "../FileErrors";

import useFiles from "../../../hooks/useFiles";
import useFirebase from "../../../hooks/useFirebase";

import computeQuantities, { MAX_SIZE } from "../../../utils/computeQuantities";
import { countFormat, round, weightFormat } from "../../../utils/math";

import { createTree } from "./createTree";
import useUser from "../../../hooks/useUser";

const hasFinished = (
  files: string[],
  progress: { [hash: string]: number }
): boolean =>
  files.reduce(
    (curr: boolean, hash: string) => curr && progress[hash] === 100,
    true
  );

const Home: FC = () => {
  const { progress } = useContext(FileContext);
  const files = useFiles();
  const hashes = files.map((file) => file.hash);
  const finished = hasFinished(hashes, progress);
  const firebase = useFirebase();
  const navigate = useNavigate();
  const user = useUser();

  const { totalArticles, totalCitations, articleCap, citationCap, sizeCap } =
    computeQuantities(files);

  const {
    mutate: create,
    isLoading,
    isError,
  } = useMutation(createTree, {
    onSuccess: (treePath: string) =>
      navigate({ pathname: treePath }, { replace: true }),
  });

  return (
    <Fragment>
      <div>
        <p>Get your seed files from web of knowledge.</p>
        <p>Then, upload your files for processing.</p>
      </div>
      <FileDropper />
      <UploadIndicator />
      <FileErrors />
      <p>Review your input:</p>
      <div className="information-cant-article">
        <div className="frame-article">
          <span className="total-articles">
            {countFormat.format(articleCap)}/{countFormat.format(totalArticles)}
          </span>
          <span className="articles">articles</span>
        </div>
        <div className="frame-article">
          <span className="total-articles">
            {countFormat.format(citationCap)}/
            {countFormat.format(totalCitations)}
          </span>
          <span className="articles">citations</span>
        </div>
        <div className="frame-article">
          <span className="total-articles">
            {weightFormat.format(round(sizeCap, 2))}/
            {weightFormat.format(round(MAX_SIZE, 2))}
          </span>
          <span className="articles">size [MB]</span>
        </div>
      </div>
      <br></br>
      <div>Time to create your Tree of Science.</div>
      <button
        className="btn btn-large btn-leaf button-continue"
        disabled={
          isLoading || !finished || totalArticles === 0 || totalCitations === 0
        }
        onClick={() => {
          finished &&
            create({ firebase, files: files.map((file) => file.hash), user });
          logEvent(firebase.analytics, "tree_created");
        }}
      >
        {isLoading ? "LOADING..." : finished ? "CONTINUE" : "UPLOADING..."}
      </button>
      {isError && (
        <div className="error">There was an error creating the thing.</div>
      )}
    </Fragment>
  );
};

export default Home;
