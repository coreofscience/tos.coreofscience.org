import { FC, useCallback, useState, Fragment, useEffect, useMemo } from "react";
import orderBy from "lodash/orderBy";
import { encode } from "js-base64";

import { doc, setDoc } from "firebase/firestore";

import useFirebase from "../../hooks/useFirebase";

import StarImage from "../vectors/StarImage";
import CopyImage from "../vectors/CopyImage";

import Reference from "./Reference";
import { mostCommon } from "../../utils/arrays";

import TreeMenu from "./TreeMenu";
import { TreeVis } from "./TreeVis";

import {
  Section,
  RootInfo,
  TrunkInfo,
  LeafInfo,
  BranchInfo,
  Keywords,
} from "../../types/treeType";
import { TreeResult } from "../../types/result";
import { info } from "./constants/info";

import "./Tree.css";

export interface Props {
  stars: Record<string, boolean>;
  treeSections: TreeResult;
  treePath: string;
}

const Tree: FC<Props> = ({ treeSections, treePath, stars }: Props) => {
  const firebase = useFirebase();
  const [show, setShow] = useState<Section | null>(null);
  const [infoEntries, setInfoEntries] = useState<
    [Section, RootInfo | TrunkInfo | LeafInfo | BranchInfo][]
  >([]);
  const treeDocRef = useMemo(
    () => doc(firebase.firestore, treePath),
    [firebase, treePath]
  );

  useEffect(() => {
    const infoClone = structuredClone(info);
    if (!treeSections.branch_1) {
      delete infoClone.branch_1;
      delete infoClone.branch_2;
      delete infoClone.branch_3;
    }
    setInfoEntries(
      Object.entries(infoClone) as [
        Section,
        RootInfo | TrunkInfo | LeafInfo | BranchInfo
      ][]
    );
  }, []);

  const keywords: Keywords = useMemo(() => {
    const keywords: Keywords = {
      root: [],
      trunk: [],
      leaf: [],
      branch_1: [],
      branch_2: [],
      branch_3: [],
    };
    const sections: Section[] = Object.keys(keywords) as Section[];
    for (let section of sections) {
      for (const article of treeSections[section] ?? []) {
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
    return keywords;
  }, [treeSections]);

  const copy = useCallback((label: string) => {
    const article: HTMLElement | null = document.getElementById(label);
    if (article && article.textContent) {
      const text: string = article.textContent;
      navigator.clipboard.writeText(text);
    }
  }, []);

  const toggleStar = useCallback(
    async (labelAsBase64: string) => {
      await setDoc(
        treeDocRef,
        {
          stars: {
            ...stars,
            [labelAsBase64]: !Boolean(stars[labelAsBase64]),
          },
        },
        { merge: true }
      );
    },
    [treeDocRef, stars]
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
      <TreeMenu
        show={show}
        toggleShow={toggleShow}
        treeSections={treeSections}
        info={info}
      />

      <TreeVis treeResult={treeSections} />

      {infoEntries.map(
        ([sectionName, info]) =>
          (!show || show === sectionName) && (
            <div
              className={`tree-segment ${sectionName}`}
              key={`tree-segment-${sectionName}`}
            >
              <div className="info">
                <h2>{info?.title ?? ""}</h2>
                <p>{info?.info ?? ""}</p>
                {keywords[sectionName].length > 0 && (
                  <p>
                    <strong>Keywords:</strong>{" "}
                    {keywords[sectionName].join(", ")}
                  </p>
                )}
              </div>
              <div className="articles">
                {orderBy(
                  treeSections[sectionName]?.map((article) => {
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
                      className="btn-copy"
                      onClick={() => copy(article.label)}
                    >
                      <CopyImage />
                    </button>
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
