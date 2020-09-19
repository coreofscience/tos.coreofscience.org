import React, { FC, useState } from "react";
import styled from "styled-components";

import TreeSegment from "./TreeSegment";
import Info from "./Info";
import Reference from "./Reference";

import DATA from "./data.json";

const PAGE_SIZE = 50;

const DEFAULT_SHOW = {
  root: 1,
  trunk: 1,
  leaf: 1,
};

const TreeMenu = styled.div`
  margin-bottom: 2em;
  display: flex;
  flex-direction: row;

  & button {
    padding: 1em 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Tree: FC<{}> = () => {
  const data = DATA;
  const { root, trunk, leaf } = data;

  const [show, setShow] = useState(DEFAULT_SHOW);

  const showMore = (part: keyof typeof DEFAULT_SHOW) => {
    setShow((current) => {
      const shown = current[part] * PAGE_SIZE;
      if (shown >= data[part].length) {
        return current;
      }
      return {
        ...current,
        [part]: current[part] + 1,
      };
    });
  };

  const showLess = (part: keyof typeof DEFAULT_SHOW) => {
    setShow((current) => {
      if (current[part] <= 1) {
        return current;
      }
      return {
        ...current,
        [part]: current[part] - 1,
      };
    });
  };

  return (
    <div>
      <TreeMenu>
        <button>
          <strong>Root</strong>
          <small>{root.length} articles</small>
        </button>
        <button>
          <strong>Trunk</strong>
          <small>{root.length} articles</small>
        </button>
        <button>
          <strong>Leaves</strong>
          <small>{root.length} articles</small>
        </button>
      </TreeMenu>
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
          {root.slice(0, show.root * PAGE_SIZE).map((article) => (
            <Reference key={article.label} {...article} />
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
          Mostrando del 0 al {show.trunk * PAGE_SIZE}
          <br />
          {trunk.slice(0, show.trunk * PAGE_SIZE).map((article) => (
            <Reference key={article.label} {...article} />
          ))}
          {show.trunk * PAGE_SIZE < trunk.length && (
            <button onClick={() => showMore("trunk")}>show more</button>
          )}
          {show.trunk > 1 && (
            <button onClick={() => showLess("trunk")}>show Less</button>
          )}
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
          {leaf.slice(0, show.leaf * PAGE_SIZE).map((article) => (
            <Reference key={article.label} {...article} />
          ))}
        </div>
      </TreeSegment>
    </div>
  );
};
export default Tree;
