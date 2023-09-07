import { FC, useCallback, useState, Fragment, useEffect, useMemo } from "react";
import orderBy from "lodash/orderBy";

import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

import useFirebase from "../../hooks/useFirebase";

import StarImage from "../vectors/StarImage";

import Reference from "./Reference";
import { mostCommon } from "../../utils/arrays";

import "./Tree.css";
import { Article } from "../../types/article";
import { TreeMetadata } from "../../types/treeMetadata";
import { encode } from "js-base64";

type RootKeyword = Array<string>
type TrunkKeyword = Array<string>
type LeafKeyword = Array<string>
type Keywords = {
  root: RootKeyword,
  trunk: TrunkKeyword,
  leaf: LeafKeyword,
  branch?: {[type: string]: Array<string>}
}
type RootInfo = {
  title: string,
  info: string,
}
type TrunkInfo = {
  title: string,
  info: string,
}
type LeafInfo = {
  title: string,
  info: string,
}
type BranchInfo = {
  title: string,
  info: string,
  branches: {[type: string]: {id: number; title: string}}
}

type Section = "root" | "trunk" | "branch" | "leaf"
interface Props {
  treeSections: { [section: string]: Article[] };
  treePath: string;
}
type Info = {
  leaf: LeafInfo,
  root: RootInfo,
  trunk: TrunkInfo,
  branch?: BranchInfo,
}

const info: Info = {
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
      applicability of your topic of interest.
    `,
  },
  branch: {
    title: "Branch",
    info: `
      Branches represent specific subareas within a knowledge domain, encapsulating
      articles centered around distinct themes derived from cluster analysis.
      Moreover, the Branches also signify the trending topics within that
      particular area.
    `,
    branches: {
      branch_type_1: {
        id: 1,
        title: "Branch Type 1",
      },
      branch_type_2: {
        id: 2,
        title: "Branch Type 2",
      },
      branch_type_3: {
        id: 3,
        title: "Branch Type 3",
      },
    },
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
  const [show, setShow] = useState<"root" | "trunk" | "branch_type_1" | "branch_type_2" | "branch_type_3" | "leaf" | null>(null);
  const [keywords, setKeywords] = useState<Keywords>({
    root: [],
    trunk: [],
    leaf: [],
  })
  const [infoEntries, setInfoEntries] = useState<[Section, RootInfo | TrunkInfo | LeafInfo | BranchInfo][]>([])
  const [branchesEntries, setBranchesEntries] = useState<[string, { id: number; title: string; }][]>([])

  const treeDocRef = useMemo(
    () => doc(firebase.firestore, treePath),
    [firebase, treePath]
  );

  useEffect(() => {
    const sections: Section[] = Object.keys(treeSections) as Section[]
    for (let section of sections) {
      if (section === "branch") {
        keywords.branch = {
          branch_type_1: [],
          branch_type_2: [],
          branch_type_3: [],
        }
      }
    }
    setKeywords(keywords)
    setInfoEntries(Object.entries(info) as [Section, RootInfo | TrunkInfo | LeafInfo | BranchInfo][])
    if (info.branch && treeSections.branch) {
      setBranchesEntries(Object.entries(info.branch.branches) as [string, { id: number; title: string; }][])
    }
  }, []);

  useEffect(() => {
    const sections: Section[] = Object.keys(keywords) as Section[]
    for (let section of sections) {
      if (section !== "branch") {
        for (let article of treeSections[section]) {
          if (!article.keywords) continue;
          keywords[section] = keywords[section].concat(article.keywords)
        }
        keywords[section] = mostCommon(
          keywords[section].map((keyword) => {
            return keyword.toLowerCase();
          }),
          5
        );
      } else {
        const articles = treeSections.branch
        for (let article of articles) {
          if (!article.keywords) continue
          if (keywords.branch) {
            if (article.branch === 1) {
              keywords.branch.branch_type_1 = keywords.branch?.branch_type_1.concat(article.keywords)
            }
            if (article.branch === 2) {
              keywords.branch.branch_type_2 = keywords.branch?.branch_type_2.concat(article.keywords)
            }
            if (article.branch === 3) {
              keywords.branch.branch_type_3 = keywords.branch?.branch_type_3.concat(article.keywords)
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
  }, [show]);

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

  const toggleShow = useCallback((label: "root" | "trunk" | "branch_type_1" | "branch_type_2" | "branch_type_3" | "leaf") => {
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
        {infoEntries.map(([sectionName , info]) => (
          sectionName !== "branch" ? (
            <button
              className={`btn btn-${sectionName} ${sectionName} ${
                !show || show === sectionName ? "active" : "inactive"
              }`}
              title={`Show only ${sectionName}`}
              onClick={() => toggleShow(sectionName as "root" | "trunk" | "branch_type_1" | "branch_type_2" | "branch_type_3" | "leaf")}
              key={`menu-${sectionName}`}
            >
              <strong>{(info || { title: "" }).title}</strong>
              <small>{treeSections[sectionName].length} articles</small>
            </button>
            ) : (
              branchesEntries.map(([type, branchInfo]) => (
                <button
                  key={`branch-${type}`}
                  className={`btn btn-${type} ${type} ${
                    !show || show === type ? "active" : "inactive"
                  }`}
                  title={`Show only branch type ${type}`}
                  onClick={() => toggleShow(type as "branch_type_1" | "branch_type_2" | "branch_type_3")}
                >
                  <strong>{(branchInfo || { title: "" }).title}</strong>
                  <small>{treeSections[sectionName] ? treeSections[sectionName].reduce((total, article: Article) => (article.branch === branchInfo.id ? total+1 : total), 0) : 0} articles</small>
                </button>
              ))
            )))}
      </div>

      {infoEntries.map(
        ([sectionName, info]) =>
          (sectionName !== "branch" && (!show || show === sectionName)) ? (
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
            branchesEntries.map(([type, branchInfo]) =>
              (sectionName === "branch" && (!show || show === type)) && (
              <div
                className={`tree-segment ${type}`}
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
                  {treeSections.branch && orderBy(
                    treeSections.branch.filter((article) => article.branch === branchInfo.id).map((article) => {
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
            ))
          )
      )}
    </Fragment>
  );
};

export default Tree;
