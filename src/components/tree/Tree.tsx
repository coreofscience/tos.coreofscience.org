import React, { FC, Fragment } from "react";

import CopyImage from "../vectors/CopyImage";
import StarImgage from "../vectors/StarImage";

import Reference from "./Reference";
import { Article } from "../../utils/customTypes";

import "./Tree.css";
import DATA from "./data.json";

const INFO: {
  [key: string]: { title: string; info: string };
} = {
  root: {
    title: "Root",
    info: `
      Here you should find seminal articles from the original articles of
      your topic of interest.
    `,
  },
  trunk: {
    title: "Trunk",
    info: `
      Here you should find articles where your topic of interest got a
      structure, these should be the first authors to discover the
      applicability of your topic of interest
    `,
  },
  leaf: {
    title: "Leaves",
    info: `
      Here you should find recent articles and reviews that should
      condense very well your topics.
    `,
  },
};

const Tree: FC<{}> = () => {
  const data: { [section: string]: Article[] } = DATA;

  return (
    <Fragment>
      <div className="tree-menu">
        {Object.entries(data).map(([sectionName, articles]) => (
          <button className={`btn btn-${sectionName} ${sectionName}`}>
            <strong>{(INFO[sectionName] || { title: "" }).title}</strong>
            <small>{articles.length} articles</small>
          </button>
        ))}
      </div>

      {Object.entries(data).map(([sectionName, articles]) => (
        <div className={`tree-segment ${sectionName}`}>
          <div className="info">
            <h2>{(INFO[sectionName] || { title: "" }).title}</h2>
            <p>
              {(INFO[sectionName] || { info: "" }).info}
              Here you should find seminal articles from the original articles
              of your topic of interest.
            </p>
            <p>
              <strong>Keywords:</strong> keyword, keyword, keyword
            </p>
          </div>
          <div className="articles">
            {articles.map((article) => (
              <div className="article">
                <Reference key={article.label} {...article} />
                <CopyImage />
                <StarImgage />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default Tree;
