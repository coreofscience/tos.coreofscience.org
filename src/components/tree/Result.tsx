import React, { Fragment, useEffect, useState } from "react";

import { doc, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";

import useFirebase from "../../hooks/useFirebase";

import { TreeMetadata } from "../../types/treeMetadata";

const Tree = React.lazy(() => import("./Tree"));
const NotFound = React.lazy(() => import("../NotFound"));

const Result = () => {
  const firebase = useFirebase();
  const [treeMetadata, setTreeMetadata] = useState<
    TreeMetadata | null | "loading"
  >("loading");

  const { pathname: treePath } = useLocation();

  useEffect(() => {
    const treeDoc = doc(firebase.firestore, treePath);
    const unsubscribe = onSnapshot(
      treeDoc,
      { includeMetadataChanges: true },
      (doc) => {
        if (!doc.exists()) {
          throw new Error(`Unable to get tree data from path: ${treePath}.`);
        }
        /**
         * TODO: find a way to set `TreeMetadata` type through the `threeRef` retrieval function.
         */
        setTreeMetadata(doc.data() as TreeMetadata);
      },
    );

    return () => unsubscribe();
  }, [firebase, treePath]);

  if (treeMetadata === "loading") {
    return <Fragment>Loading...</Fragment>;
  }

  // Return not found if there's no tree with the requested id
  if (treeMetadata === null) {
    return <NotFound />;
  }

  // Return waiting for a worker if not startedDate
  if (!treeMetadata.startedDate) {
    return <Fragment>Waiting for a worker to process your tree...</Fragment>;
  }

  // Return processing if startedDate and not finishedDate
  if (!treeMetadata.finishedDate) {
    return <Fragment>Currently processing your tree...</Fragment>;
  }

  // Return error processing if there's an error
  if (treeMetadata.error || !treeMetadata.result) {
    return (
      <Fragment>
        Life is hard, there was an error creating your tree...
      </Fragment>
    );
  }

  return (
    <Tree
      treeSections={treeMetadata.result}
      treePath={treePath}
      stars={treeMetadata.stars || {}}
    />
  );
};

export default Result;
