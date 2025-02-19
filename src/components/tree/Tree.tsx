import useFirebase from "../../hooks/useFirebase";
import { Analysis } from "../../types/Analysis";
import { TreeResult } from "../../types/result";
import {
  Section,
  RootInfo,
  TrunkInfo,
  LeafInfo,
  BranchInfo,
  Keywords,
} from "../../types/treeType";
import { mostCommon } from "../../utils/arrays";
import Button from "../ui/Button";
import CopyImage from "../vectors/CopyImage";
import StarImage from "../vectors/StarImage";
import Download from "./Download";
import Reference from "./Reference";
import TreeMenu from "./TreeMenu";
import { TreeVis } from "./TreeVis";
import { info } from "./constants/info";
import { doc, setDoc } from "firebase/firestore";
import { encode } from "js-base64";
import orderBy from "lodash/orderBy";
import { FC, useCallback, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

type TreeProps = {
  stars: Record<string, boolean>;
  treeSections: TreeResult;
  treePath: string;
  analysis: Analysis | undefined;
};

const Tree: FC<TreeProps> = ({ treeSections, treePath, stars, analysis }) => {
  const firebase = useFirebase();
  const [show, setShow] = useState<Section | null>(null);
  const [infoEntries, setInfoEntries] = useState<
    [Section, RootInfo | TrunkInfo | LeafInfo | BranchInfo][]
  >([]);
  const treeDocRef = useMemo(
    () => doc(firebase.firestore, treePath),
    [firebase, treePath],
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
        RootInfo | TrunkInfo | LeafInfo | BranchInfo,
      ][],
    );
  }, [treeSections.branch_1]);

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
    for (const section of sections) {
      for (const article of treeSections[section] ?? []) {
        if (!article.keywords) continue;
        keywords[section] = keywords[section].concat(article.keywords);
      }
      keywords[section] = mostCommon(
        keywords[section].map((keyword) => {
          return keyword.toLowerCase();
        }),
        5,
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
            [labelAsBase64]: !stars[labelAsBase64],
          },
        },
        { merge: true },
      );
    },
    [treeDocRef, stars],
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
                    "font-tall text-2xl font-semibold uppercase " +
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
                {info?.info ? (
                  <p>
                    {`${info.info} ${info.doc}`}{" "}
                    <Button variant="link" size="link" asChild>
                      <Link to="/docs/sap">docs.</Link>
                    </Button>
                  </p>
                ) : (
                  ""
                )}
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
                  "desc",
                ).map(({ article, labelAsBase64, star }) => (
                  <div
                    className="flex flex-row items-center gap-2 p-2 nth-[2n+1]:bg-slate-100"
                    key={`article-${article.label}`}
                  >
                    <Reference {...article} />
                    <div className="flex flex-row">
                      <Button
                        variant="asChild"
                        size="icon"
                        className="text-slate-300 hover:text-slate-400 active:text-slate-400"
                        onClick={() => copy(article.label)}
                      >
                        <CopyImage />
                      </Button>
                      <Button
                        variant="asChild"
                        size="icon"
                        className={
                          star
                            ? "text-yellow-500 hover:text-yellow-600 active:text-yellow-600"
                            : "text-slate-300 hover:text-slate-400 active:text-slate-400"
                        }
                        onClick={() => toggleStar(labelAsBase64)}
                      >
                        <StarImage />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
      )}
      <Download analysis={analysis} treeSections={treeSections} />
    </div>
  );
};

export default Tree;
