import React, { FC } from "react";
import { useParams } from "react-router";
import { Tree as TreeCss, TreeSegment, Info } from "../StyleComponents";
import Reference from "./Reference";

// TODO: Import this https://github.com/coreofscience/python-sap/blob/main/src/sap/template.html
// REFERENCE FORMAT: https://github.com/coreofscience/python-sap/blob/main/src/sap/widget.py#L37-L97

import DATA from "./data.json";

const Tree: FC<{}> = () => {
  const { treeId } = useParams();
  const { root, trunk, leaf } = DATA;
  return (
    <TreeCss>
      <TreeSegment className="root">
        <div className="info">
          <Info>
            <h3>Root</h3>
            <p>
              Here you should find seminal articles from the original articles
              of your topic of interest.
            </p>
          </Info>
        </div>
        <div className="articles">
          {root.map((article) => (
            <Reference {...article} />
          ))}
        </div>
      </TreeSegment>

      <TreeSegment className="trunk">
        <div className="info">
          <Info>
            <h3>Trunk</h3>
            <p>
              Here you should find articles where your topic of interest got a
              structure, these should be the first authors to discover the
              applicability of your topic of interest
            </p>
          </Info>
        </div>
        <div className="articles">
          {trunk.map((article) => (
            <Reference {...article} />
          ))}
        </div>
      </TreeSegment>
      <TreeSegment className="leaf">
        <div className="info">
          <Info>
            <h3>Leaves</h3>
            <p>
              Here you should find recent articles and reviews that should
              condense very well your topics.
            </p>
          </Info>
        </div>

        <div className="articles">
          {leaf.map((article) => (
            <Reference {...article} />
          ))}
        </div>
      </TreeSegment>
    </TreeCss>
  );
};
export default Tree;
