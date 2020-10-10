import React, { FC, useContext } from "react";

import FileContext from "../../context/FileContext";
import FileDropper from "./FileDropper";
import UploadIndicator from "./UploadIndicator";

import "./Home.css";
import { FileMetadata } from "../../utils/customTypes";

const numberFormat = new Intl.NumberFormat();

const Home: FC<{}> = () => {
  const { files } = useContext(FileContext);

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
            {numberFormat.format(totalArticles)}/
            {numberFormat.format(articleCap)}
          </span>
          <span className="articles">article</span>
        </div>
        <div className="frame-article">
          <span className="total-articles">
            {numberFormat.format(totalCitations)}/
            {numberFormat.format(citationCap)}
          </span>
          <span className="articles">citations</span>
        </div>
      </div>
      <br></br>
      <div>Time to create your Tree of Science.</div>
      <button className="btn btn-large btn-leaf button-continue">
        CONTINUE
      </button>
    </main>
  );
};

export default Home;
