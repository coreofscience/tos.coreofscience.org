import React, { FC } from 'react';
import { useParams } from 'react-router';
const Tree: FC<{}> = () => {
  const { treeId } = useParams();
  return (
    <main>
      <div>
        <h5> Id : {treeId} Aquí va el arbolito :)</h5>
      </div>
    </main>
  );
};
export default Tree;
