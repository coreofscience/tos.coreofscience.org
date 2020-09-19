import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { Tree as TreeCss, TreeSegment, Info } from '../StyleComponents';
import Reference from './Reference';

// TODO: Import this https://github.com/coreofscience/python-sap/blob/main/src/sap/template.html
// REFERENCE FORMAT: https://github.com/coreofscience/python-sap/blob/main/src/sap/widget.py#L37-L97

import DATA from './data.json';

const PAGE_SIZE = 50;

const DEFAULT_SHOW = {
  root: 1,
  trunk: 1,
  leaf: 1,
};

const Tree: FC<{}> = () => {
  const { treeId } = useParams();
  const data = DATA;
  const { root, trunk, leaf } = data;

  const [show, setShow] = useState(DEFAULT_SHOW);
  const [simple, setSimple] = useState(false);

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
    <TreeCss>
      <code>
        <pre>{JSON.stringify(show, null, 2)}</pre>
      </code>
      <button onClick={() => setSimple((current) => !current)}>
        show {simple ? 'more' : 'less'} information
      </button>
      <TreeSegment className='root'>
        <div className='info'>
          <Info>
            <h3>Root</h3>
            <p>
              Here you should find seminal articles from the original articles
              of your topic of interest.
            </p>
          </Info>
        </div>
        <div className='articles'>
          {root.slice(0, show.root * PAGE_SIZE).map((article) => (
            <Reference key={article.label} simple={simple} {...article} />
          ))}
        </div>
      </TreeSegment>
      <TreeSegment className='trunk'>
        <div className='info'>
          <Info>
            <h3>Trunk</h3>
            <p>
              Here you should find articles where your topic of interest got a
              structure, these should be the first authors to discover the
              applicability of your topic of interest
            </p>
          </Info>
        </div>
        <div className='articles'>
          Mostrando del 0 al {show.trunk * PAGE_SIZE}
          <br />
          {trunk.slice(0, show.trunk * PAGE_SIZE).map((article) => (
            <Reference key={article.label} simple={simple} {...article} />
          ))}
          {show.trunk * PAGE_SIZE < trunk.length && (
            <button onClick={() => showMore('trunk')}>show more</button>
          )}
          {show.trunk > 1 && (
            <button onClick={() => showLess('trunk')}>show Less</button>
          )}
        </div>
      </TreeSegment>
      <TreeSegment className='leaf'>
        <div className='info'>
          <Info>
            <h3>Leaves</h3>
            <p>
              Here you should find recent articles and reviews that should
              condense very well your topics.
            </p>
          </Info>
        </div>

        <div className='articles'>
          {leaf.slice(0, show.leaf * PAGE_SIZE).map((article) => (
            <Reference key={article.label} simple={simple} {...article} />
          ))}
        </div>
      </TreeSegment>
    </TreeCss>
  );
};
export default Tree;
