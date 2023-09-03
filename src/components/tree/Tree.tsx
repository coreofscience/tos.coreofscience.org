import { FC, useCallback, useState, Fragment, useEffect, useMemo } from "react";
import orderBy from "lodash/orderBy";

import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

import useFirebase from "../../hooks/useFirebase";

import StarImage from "../vectors/StarImage";

import Reference from "./Reference";
import { mostCommon } from "../../utils/arrays";

import "./Tree.css";
import { TreeMetadata } from "../../types/treeMetadata";
import { encode } from "js-base64";
import { TreeVis } from "./TreeVis";
import { Section, TreeResult } from "../../types/result";

interface Props {
  treeSections: TreeResult;
  treePath: string;
}

const INFO = {
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

const Tree: FC<Props> = ({ treeSections, treePath }: Props) => {
  const firebase = useFirebase();
  const [stars, setStars] = useState<NonNullable<TreeMetadata["stars"]>>({});
  const [show, setShow] = useState<"root" | "trunk" | "leaf" | null>(null);
  const treeDocRef = useMemo(
    () => doc(firebase.firestore, treePath),
    [firebase, treePath]
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(treeDocRef, (doc) => {
      if (!doc.exists()) {
        throw new Error(
          `Unable to get tree data from path: ${treeDocRef.path}.`
        );
      }
      /**
       * TODO: find a way to set `TreeMetadata["stars"]` type through the `starsRef` retrieval function.
       */
      setStars((doc.data().stars ?? {}) as NonNullable<TreeMetadata["stars"]>);
    });
    return () => unsubscribe();
  }, [firebase, treeDocRef]);

  const keywords = useMemo(() => {
    const keywords: {
      root: string[];
      trunk: string[];
      leaf: string[];
    } = {
      root: [],
      trunk: [],
      leaf: [],
    };
    for (const section of Object.keys(keywords)) {
      for (const article of treeSections[section as Section]) {
        if (!article.keywords) continue;
        keywords[section as Section] = keywords[section as Section].concat(
          article.keywords
        );
      }
      keywords[section as Section] = mostCommon(
        keywords[section as Section].map((keyword) => {
          return keyword.toLowerCase();
        }),
        5
      );
    }
    return keywords;
  }, [treeSections]);

  const toggleStar = useCallback(
    async (labelAsBase64: string) => {
      const treeDoc = await getDoc(treeDocRef);
      if (!treeDoc.exists()) {
        throw new Error(
          `Unable to get tree data from path: ${treeDocRef.path}.`
        );
      }
      const treeData = treeDoc.data() as TreeMetadata;
      await setDoc(treeDocRef, {
        ...treeData,
        stars: {
          ...treeData.stars,
          [labelAsBase64]: !Boolean(treeData.stars?.[labelAsBase64]),
        },
      });
    },
    [treeDocRef]
  );

  const toggleShow = useCallback((label: Section) => {
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
            <small>
              {treeSections[sectionName as Section].length} articles
            </small>
          </button>
        ))}
      </div>

      <TreeVis treeResult={treeSections} />

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
                {keywords[sectionName as Section].length > 0 && (
                  <p>
                    <strong>Keywords:</strong>{" "}
                    {keywords[sectionName as Section].join(", ")}
                  </p>
                )}
              </div>
              <div className="articles">
                {orderBy(
                  treeSections[sectionName as Section].map((article) => {
                    const labelAsBase64 = encode(article.label);
                    const star = stars[labelAsBase64] ?? 0;
                    return { article, labelAsBase64, star };
                  }),
                  "star",
                  "desc"
                ).map(({ article, labelAsBase64, star }) => (
                  <div className="article" key={`article-${article.label}`}>
                    <Reference key={article.label} {...article} />
                    <button
                      className={`btn-star ${star ? "favorite" : ""}`}
                      onClick={() => toggleStar(labelAsBase64)}
                    >
                      <StarImage />
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
