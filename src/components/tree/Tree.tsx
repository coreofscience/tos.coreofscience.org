import React, { FC, useCallback, useState } from 'react';
import sortBy from 'lodash.sortby';

import CopyImage from '../vectors/CopyImage';
import StarImgage from '../vectors/StarImage';
import StarOutline from '../vectors/StarOutline';

import Reference from './Reference';
import { Article } from '../../utils/customTypes';

import './Tree.css';
import DATA from './data.json';

const INFO: {
  [key: string]: { title: string; info: string };
} = {
  root: {
    title: 'Root',
    info: `
      Here you should find seminal articles from the original articles of
      your topic of interest.
    `,
  },
  trunk: {
    title: 'Trunk',
    info: `
      Here you should find articles where your topic of interest got a
      structure, these should be the first authors to discover the
      applicability of your topic of interest
    `,
  },
  leaf: {
    title: 'Leaves',
    info: `
      Here you should find recent articles and reviews that should
      condense very well your topics.
    `,
  },
};

const DEFAULT_SHOW = {
  root: true,
  trunk: true,
  leaf: true,
};

const Tree: FC<{}> = () => {
  const data: { [section: string]: Article[] } = DATA;
  const [star, setStar] = useState<{ [label: string]: boolean }>({});
  const [show, setShow] = useState<{ [section: string]: boolean }>(
    DEFAULT_SHOW
  );

  const toggleStar = useCallback((label: string) => {
    setStar((current) => ({ ...current, [label]: !current[label] }));
  }, []);

  const toggleShow = useCallback((label: string) => {
    setShow((curr) => {
      if (
        Object.values(curr).reduce(
          (acc, selected) => acc + (selected ? 1 : 0),
          0
        ) === 1 &&
        curr[label]
      ) {
        return {
          root: true,
          trunk: true,
          leaf: true,
        };
      }
      return {
        root: false,
        trunk: false,
        leaf: false,
        [label]: true,
      };
    });
  }, []);

  return (
    <div>
      <div className='tree-menu'>
        {Object.entries(data).map(([sectionName, articles]) => (
          <button
            className={`btn btn-${sectionName} ${sectionName} ${
              show[sectionName] ? 'active' : 'inactive'
            }`}
            title='Show only trunk'
            onClick={() => toggleShow(sectionName)}
            key={`menu-${sectionName}`}>
            <strong>{(INFO[sectionName] || { title: '' }).title}</strong>
            <small>{articles.length} articles</small>
          </button>
        ))}
      </div>

      {Object.entries(data).map(
        ([sectionName, articles]) =>
          !!show[sectionName] && (
            <div
              className={`tree-segment ${sectionName}`}
              key={`tree-segment-${sectionName}`}>
              <div className='info'>
                <h2>{(INFO[sectionName] || { title: '' }).title}</h2>
                <p>
                  {(INFO[sectionName] || { info: '' }).info}
                  Here you should find seminal articles from the original
                  articles of your topic of interest.
                </p>
                <p>
                  <strong>Keywords:</strong> keyword, keyword, keyword
                </p>
              </div>
              <div className='articles'>
                {sortBy(articles, (article) => star[article.label]).map(
                  (article) => (
                    <div className='article' key={`article-${article.label}`}>
                      <Reference key={article.label} {...article} />
                      <CopyImage />

                      <button
                        className='btn-star'
                        onClick={() => toggleStar(article.label)}>
                        {!!star[article.label] ? (
                          <StarImgage />
                        ) : (
                          <StarOutline />
                        )}
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
};
export default Tree;
