import React, { FC } from "react";
import { useParams } from "react-router";

// TODO: Import this https://github.com/coreofscience/python-sap/blob/main/src/sap/template.html

import DATA from "./data.json";

const Tree: FC<{}> = () => {
  const { treeId } = useParams();
  const { root, trunk, leaf } = DATA;
  return (
    <main>
      <div>
        <h2> Id : {treeId} Aquí va el arbolito :)</h2>
        <h3>Root</h3>
        {root.map((article) => (
          <p>{article.title || article.label}</p>
        ))}
        <h3>Trunk</h3>
        {trunk.map((article) => (
          <p>{article.title}</p>
        ))}
        <h3>Leaf</h3>
        {leaf.map((article) => (
          <p>{article.title}</p>
        ))}
      </div>
    </main>
  );
};
export default Tree;
