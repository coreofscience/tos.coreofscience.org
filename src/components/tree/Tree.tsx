import React, { FC, useCallback, useState, Fragment, useEffect } from "react";
import sortBy from "lodash.sortby";
import { onValue, ref, set } from "firebase/database";

import useFirebase from "../../hooks/useFirebase";

import StarImgage from "../vectors/StarImage";

import Reference from "./Reference";
import { mostCommon } from "../../utils/arrays";
import { Article } from "../../utils/customTypes";

import "./Tree.css";

interface Props {
  data: { [section: string]: Article[] };
  treeId?: string;
}

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

type StarsType = Record<string, boolean>;

const Tree: FC<Props> = ({ data, treeId }: Props) => {
  const [star, setStar] = useState<StarsType>({});
  const [show, setShow] = useState<"root" | "trunk" | "leaf" | null>(null);
  const firebase = useFirebase();
  let keywords: { [label: string]: string[] } = {
    root: [],
    trunk: [],
    leaf: [],
  };
  const starsPath = `stars/${treeId}`;

  for (let section of Object.keys(keywords)) {
    for (let article of data[section]) {
      if (!article.keywords) continue;
      keywords[section] = keywords[section].concat(article.keywords);
    }
    keywords[section] = mostCommon(
      keywords[section].map((keyword) => {
        return keyword.toLowerCase();
      }),
      5
    );
  }

  useEffect(() => {
    const starsRef = ref(firebase.database, starsPath);
    const unsubscribe = onValue(starsRef, (change) => {
      if (!change.exists()) {
        /**
         * Stars related to the tree may be not found in the db,
         * so let's not throw an error, log that instead.
         */
        console.log(`Unable to get stars data from path: ${starsPath}.`);
      }
      /**
       * TODO: find a way to set `StarsType` type through the `starsRef` retrieval function.
       */
      setStar((change.val() ?? {}) as StarsType);
    });
    return () => unsubscribe();
  }, [firebase, treeId, starsPath]);

  const toggleStar = useCallback(
    (label: string) => {
      const starsRef = ref(firebase.database, starsPath);
      set(starsRef, { ...star, [btoa(label)]: !star[btoa(label)] });
    },
    [firebase, star, starsPath]
  );

  const toggleShow = useCallback((label: "root" | "trunk" | "leaf") => {
    setShow((curr) => {
      if (curr === label) {
        return null;
      }
      return label;
    });
  }, []);

  return (
    <Fragment>
      <div className="tree-menu">
        {Object.entries(INFO).map(([sectionName, info]) => (
          <button
            className={`btn btn-${sectionName} ${sectionName} ${
              !show || show === sectionName ? "active" : "inactive"
            }`}
            title="Show only trunk"
            onClick={() => toggleShow(sectionName as "root" | "trunk" | "leaf")}
            key={`menu-${sectionName}`}
          >
            <strong>{(info || { title: "" }).title}</strong>
            <small>{data[sectionName].length} articles</small>
          </button>
        ))}
      </div>

      {Object.entries(INFO).map(
        ([sectionName, info]) =>
          (!show || show === sectionName) && (
            <div
              className={`tree-segment ${sectionName}`}
              key={`tree-segment-${sectionName}`}
            >
              <div className="info">
                <h2>{(info || { title: "" }).title}</h2>
                <p>{(info || { info: "" }).info}</p>
                {keywords[sectionName].length > 0 && (
                  <p>
                    <strong>Keywords:</strong>{" "}
                    {keywords[sectionName].join(", ")}
                  </p>
                )}
              </div>
              <div className="articles">
                {sortBy(data[sectionName], (article) =>
                  !star[btoa(article.label)] ? 1 : 0
                ).map((article) => (
                  <div className="article" key={`article-${article.label}`}>
                    <Reference key={article.label} {...article} />
                    {/* <button className="btn-star">
                      <CopyImage />
                    </button> */}
                    <button
                      className={`btn-star ${
                        star[btoa(article.label)] ? "favorite" : ""
                      }`}
                      onClick={() => toggleStar(article.label)}
                    >
                      {!!star[btoa(article.label)] ? (
                        <StarImgage />
                      ) : (
                        <StarImgage />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </Fragment>
  );
};
export default Tree;
