import React, { FC } from "react";

import FileDropper from "./FileDropper";
import UploadIndicator from "./UploadIndicator";

import "./Home.css";

const Home: FC<{}> = () => {
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
          <span className="total-articles">500/800 </span>
          <span className="articles">article</span>
        </div>
        <div className="frame-article">
          <span className="total-articles">500/800 </span>
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
