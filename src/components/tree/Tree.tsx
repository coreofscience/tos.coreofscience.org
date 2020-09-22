import React, { FC, useState } from 'react';

import CopyImage from '../vectors/CopyImage';
import StarImgage from '../vectors/StarImage';

import Reference from './Reference';

import './Tree.css';
import DATA from './data.json';
import src from '*.bmp';

const PAGE_SIZE = 50;

const DEFAULT_SHOW = {
  root: 1,
  trunk: 1,
  leaf: 1,
};

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
      <div className='tree-menu'>
        <button className='root'>
          <strong>Root</strong>
          <small>{root.length} articles</small>
        </button>
        <button className='trunk'>
          <strong>Trunk</strong>
          <small>{root.length} articles</small>
        </button>
        <button className='leaves'>
          <strong>Leaves</strong>
          <small>{root.length} articles</small>
        </button>
      </div>
      <div className='tree-segment root'>
        <div className='info'>
          <h2>Root</h2>
          <p>
            Here you should find seminal articles from the original articles of
            your topic of interest.
          </p>
          <p>
            <strong>Keywords:</strong> keyword, keyword, keyword
          </p>
        </div>
        <div className='articles'>
          {root.slice(0, show.root * PAGE_SIZE).map((article) => (
            <div className='article'>
              <Reference key={article.label} {...article} />
              <CopyImage />
              <StarImgage />
            </div>
          ))}
        </div>
      </div>
      <div className='tree-segment trunk'>
        <div className='info'>
          <h2>Trunk</h2>
          <p>
            Here you should find articles where your topic of interest got a
            structure, these should be the first authors to discover the
            applicability of your topic of interest
          </p>
          <p>
            <strong>Keywords:</strong> keyword, keyword, keyword
          </p>
        </div>
        <div className='articles'>
          Mostrando del 0 al {show.trunk * PAGE_SIZE}
          <br />
          {trunk.slice(0, show.trunk * PAGE_SIZE).map((article) => (
            <div className='article'>
              <Reference key={article.label} {...article} />
              <CopyImage />
              <StarImgage />
            </div>
          ))}
          {show.trunk * PAGE_SIZE < trunk.length && (
            <button onClick={() => showMore('trunk')}>show more</button>
          )}
          {show.trunk > 1 && (
            <button onClick={() => showLess('trunk')}>show Less</button>
          )}
        </div>
      </div>
      <div className='tree-segment leaves'>
        <div className='info'>
          <h2>Leaves</h2>
          <p>
            Here you should find recent articles and reviews that should
            condense very well your topics.
          </p>

          <p>
            <strong>Keywords:</strong> keyword, keyword, keyword
          </p>
        </div>

        <div className='articles'>
          {leaf.slice(0, show.leaf * PAGE_SIZE).map((article) => (
            <div className='article'>
              <Reference key={article.label} {...article} />
              <CopyImage />
              <StarImgage />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tree;
