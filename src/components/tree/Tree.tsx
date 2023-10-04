import { FC, useCallback, useState, useEffect, useMemo } from "react";
import orderBy from "lodash/orderBy";
import { encode } from "js-base64";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col gap-4">
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
              className="flex flex-col gap-4"
              key={`tree-segment-${sectionName}`}
            >
              <div className="flex flex-col gap-2">
                <h2
                  className={
                    "uppercase font-tall font-semibold text-2xl " +
                    {
                      root: "text-root",
                      trunk: "text-trunk",
                      branch_1: "text-branch",
                      branch_2: "text-branch",
                      branch_3: "text-branch",
                      leaf: "text-leaf",
                    }[sectionName]
                  }
                >
                  {info?.title ?? ""}
                </h2>
                <p>{info?.info ?? ""}</p>
                {info?.doc ? (
                 <p>
                   {info.doc} <Link className="text-sky-600 hover:text-sky-800 active:text-sky-800 transition-colors ease-in" to="/docs/sap">docs.</Link>
                 </p>
                  ) : ""}
                {keywords[sectionName].length > 0 && (
                  <p>
                    <strong>Keywords:</strong>{" "}
                    {keywords[sectionName].join(", ")}
                  </p>
                )}
              </div>
              <div>
                {orderBy(
                  treeSections[sectionName]?.map((article) => {
                    const labelAsBase64 = encode(article.label);
                    const star = stars[labelAsBase64] ?? 0;
                    return { article, labelAsBase64, star };
                  }),
                  "star",
                  "desc"
                ).map(({ article, labelAsBase64, star }) => (
                  <div
                    className="flex flex-row items-center [&:nth-child(2n+1)]:bg-slate-100 p-2 gap-2"
                    key={`article-${article.label}`}
                  >
                    <Reference key={article.label} {...article} />
                    <button
                      className="text-slate-300 active:text-slate-400 hover:text-slate-400"
                      onClick={() => copy(article.label)}
                    >
                      <CopyImage />
                    </button>
                    <button
                      className={
                        star
                          ? "text-yellow-500"
                          : "text-slate-300 active:text-slate-400 hover:text-slate-400"
                      }
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
    </div>
  );
};

export default Tree;
