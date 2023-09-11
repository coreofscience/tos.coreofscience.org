import { FC, useCallback, useState, Fragment, useEffect, useMemo } from "react";
import orderBy from "lodash/orderBy";
import { encode } from "js-base64";

import { doc, setDoc } from "firebase/firestore";

import useFirebase from "../../hooks/useFirebase";

import StarImage from "../vectors/StarImage";
import CopyImage from "../vectors/CopyImage";

import Reference from "./Reference";
import { mostCommon } from "../../utils/arrays";

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
  const [show, setShow] = useState<
    | "root"
    | "trunk"
    | "branch_type_1"
    | "branch_type_2"
    | "branch_type_3"
    | "leaf"
    | null
  >(null);
  const [infoEntries, setInfoEntries] = useState<
    [Section, RootInfo | TrunkInfo | LeafInfo | BranchInfo][]
  >([]);
  const [branchesEntries, setBranchesEntries] = useState<
    [string, { id: number; title: string }][]
  >([]);
  const treeDocRef = useMemo(
    () => doc(firebase.firestore, treePath),
    [firebase, treePath]
  );

  useEffect(() => {
    setInfoEntries(
      Object.entries(info) as [
        Section,
        RootInfo | TrunkInfo | LeafInfo | BranchInfo
      ][]
    );
    if (info.branch && treeSections.branch?.length > 0) {
      setBranchesEntries(
        Object.entries(info.branch.branches) as [
          string,
          { id: number; title: string }
        ][]
      );
    }
  }, []);

  const keywords: Keywords = useMemo(() => {
    const keywords: Keywords = {
      root: [],
      trunk: [],
      leaf: [],
      branch: {
        branch_type_1: [],
        branch_type_2: [],
        branch_type_3: [],
      },
    };
    const sections: Section[] = Object.keys(keywords) as Section[];
    for (let section of sections) {
      if (section !== "branch") {
        for (let article of treeSections[section]) {
          if (!article.keywords) continue;
          keywords[section] = keywords[section].concat(article.keywords);
        }
        keywords[section] = mostCommon(
          keywords[section].map((keyword) => {
            return keyword.toLowerCase();
          }),
          5
        );
      } else {
        const articles = treeSections.branch;
        if (articles?.length > 0) {
          for (let article of articles) {
            if (!article.keywords) continue;
            if (keywords.branch) {
              if (article.branch === 1) {
                keywords.branch.branch_type_1 =
                  keywords.branch?.branch_type_1.concat(article.keywords);
              }
              if (article.branch === 2) {
                keywords.branch.branch_type_2 =
                  keywords.branch?.branch_type_2.concat(article.keywords);
              }
              if (article.branch === 3) {
                keywords.branch.branch_type_3 =
                  keywords.branch?.branch_type_3.concat(article.keywords);
              }
            }
          }
        }
        if (keywords.branch) {
          keywords.branch.branch_type_1 = mostCommon(
            keywords.branch.branch_type_1.map((keyword) => {
              return keyword.toLowerCase();
            }),
            5
          );
          keywords.branch.branch_type_2 = mostCommon(
            keywords.branch.branch_type_2.map((keyword) => {
              return keyword.toLowerCase();
            }),
            5
          );
          keywords.branch.branch_type_3 = mostCommon(
            keywords.branch.branch_type_3.map((keyword) => {
              return keyword.toLowerCase();
            }),
            5
          );
        }
      }
    }
    return keywords;
  }, [treeSections]);

  const copy = useCallback((label: string) => {
    const article: HTMLElement | null = document.getElementById(label);
    if (article && article.textContent) {
      const text: string = article.textContent;
      navigator.clipboard
        .writeText(text)
        .then()
        .catch(() => {
          console.error(
            `An error occurred when pasting the text from ${label}`
          );
        });
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

  const toggleShow = useCallback(
    (
      label:
        | "root"
        | "trunk"
        | "branch_type_1"
        | "branch_type_2"
        | "branch_type_3"
        | "leaf"
    ) => {
      setShow((curr) => {
        if (curr === label) {
          return null;
        }
        return label;
      });
    },
    []
  );

  return (
    <Fragment>
      <div className="tree-menu">
        {infoEntries.map(([sectionName, info]) =>
          sectionName !== "branch" ? (
            <button
              className={`btn btn-${sectionName} ${sectionName} ${
                !show || show === sectionName ? "active" : "inactive"
              }`}
              title={`Show only ${sectionName}`}
              onClick={() =>
                toggleShow(
                  sectionName as
                    | "root"
                    | "trunk"
                    | "branch_type_1"
                    | "branch_type_2"
                    | "branch_type_3"
                    | "leaf"
                )
              }
              key={`menu-${sectionName}`}
            >
              <strong>{(info || { title: "" }).title}</strong>
              <small>{treeSections[sectionName].length} articles</small>
            </button>
          ) : (
            branchesEntries &&
            branchesEntries.length > 0 && (
              <div className="btn-branches" key="section-branches">
                {branchesEntries.map(([type, branchInfo]) => (
                  <button
                    key={`branch-${type}`}
                    className={`btn btn-branch branch ${
                      !show || show === type ? "active" : "inactive"
                    }`}
                    title={`Show only branch type ${type}`}
                    onClick={() =>
                      toggleShow(
                        type as
                          | "branch_type_1"
                          | "branch_type_2"
                          | "branch_type_3"
                      )
                    }
                  >
                    <strong>{(branchInfo || { title: "" }).title}</strong>
                  </button>
                ))}
              </div>
            )
          )
        )}
      </div>

      <TreeVis treeResult={treeSections} />

      {infoEntries.map(([sectionName, info]) =>
        sectionName !== "branch" && (!show || show === sectionName) ? (
          <div
            className={`tree-segment ${sectionName}`}
            key={`tree-segment-${sectionName}`}
          >
            <div className="info">
              <h2>{(info || { title: "" }).title}</h2>
              <p>{(info || { info: "" }).info}</p>
              {keywords[sectionName].length > 0 && (
                <p>
                  <strong>Keywords:</strong> {keywords[sectionName].join(", ")}
                </p>
              )}
            </div>
            <div className="articles">
              {orderBy(
                treeSections[sectionName].map((article) => {
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
        ) : (
          branchesEntries.map(
            ([type, branchInfo]) =>
              sectionName === "branch" &&
              (!show || show === type) && (
                <div
                  className="tree-segment branch"
                  key={`tree-segment-${type}`}
                >
                  <div className="info">
                    <h2>{(branchInfo || { title: "" }).title}</h2>
                    <p>{(info || { info: "" }).info}</p>
                    {keywords.branch && keywords.branch[type].length > 0 && (
                      <p>
                        <strong>Keywords:</strong>{" "}
                        {keywords.branch && keywords.branch[type].join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="articles">
                    {treeSections.branch?.length > 0 &&
                      orderBy(
                        treeSections.branch
                          .filter((article) => article.branch === branchInfo.id)
                          .map((article) => {
                            const labelAsBase64 = encode(article.label);
                            const star = stars[labelAsBase64] ?? 0;
                            return { article, labelAsBase64, star };
                          }),
                        "star",
                        "desc"
                      ).map(({ article, labelAsBase64, star }) => (
                        <div
                          className="article"
                          key={`article-${article.label}`}
                        >
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
          )
        )
      )}
    </Fragment>
  );
};

export default Tree;
