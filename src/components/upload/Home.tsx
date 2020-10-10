import React, { FC, useContext } from "react";
import { useMutation } from "react-query";

import FileContext from "../../context/FileContext";
import FileDropper from "./FileDropper";
import UploadIndicator from "./UploadIndicator";

import "./Home.css";
import { FileMetadata } from "../../utils/customTypes";
import FirebaseContext from "../../context/FirebaseContext";
import { useHistory } from "react-router";

const numberFormat = new Intl.NumberFormat();

const createTree = async ({
  app,
  files,
}: {
  app: firebase.app.App;
  files: string[];
}) => {
  if (!files.length) {
    throw new Error("Files cannot be empty.");
  }

  const database = app.database();
  const result = await database.ref("trees").push({
    files,
    createdDate: new Date().getTime(),
  });
  if (!result.key) {
    throw new Error("Failed to retrieve a new key.");
  }
  return btoa(result.key);
};

const hasFinished = (progress: { [hash: string]: number }): boolean => {
  const total = Object.values(progress).reduce((a, b) => a + b, 0);
  return total === Object.keys(progress).length * 100;
};

const Home: FC<{}> = () => {
  const { files, progress } = useContext(FileContext);
  const finished = hasFinished(progress);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const totalArticles = files.reduce((acc, el) => acc + (el.articles || 0), 0);
  const totalCitations = files.reduce(
    (acc, el) => acc + (el.citations || 0),
    0
  );
  const articleCap = Math.min(totalArticles, 500);
  const citationCap = files
    .reduce(
      (acc: FileMetadata[], el) =>
        acc.reduce((acc, el) => acc + (el.articles || 0), 0) >= articleCap
          ? acc
          : [...acc, el],
      []
    )
    .reduce((acc, el) => acc + (el.citations || 0), 0);

  const [create, { isLoading, isError }] = useMutation(createTree, {
    onSuccess: (treeId) => history.push(`/tree/${treeId}`),
    // onError: console.log,
  });

  return (
    <main>
      <div>
        <p>Get your seed files from web of knowledge.</p>
        <p>The upload your files for processing.</p>
      </div>
      <FileDropper />
      <UploadIndicator />
      <p>Review your input:</p>
      <div className="information-cant-article">
        <div className="frame-article">
          <span className="total-articles">
            {numberFormat.format(articleCap)}/
            {numberFormat.format(totalArticles)}
          </span>
          <span className="articles">articles</span>
        </div>
        <div className="frame-article">
          <span className="total-articles">
            {numberFormat.format(citationCap)}/
            {numberFormat.format(totalCitations)}
          </span>
          <span className="articles">citations</span>
        </div>
      </div>
      <br></br>
      <div>Time to create your Tree of Science.</div>
      <button
        className="btn btn-large btn-leaf button-continue"
        disabled={
          isLoading || !finished || totalArticles === 0 || totalCitations === 0
        }
        onClick={() =>
          firebase &&
          finished &&
          create({ app: firebase, files: files.map((file) => file.hash) })
        }
      >
        {isLoading ? "LOADING..." : "CONTINUE"}
      </button>
      {isError && (
        <div className="error">There was an errror creating the thing.</div>
      )}
    </main>
  );
};

export default Home;
