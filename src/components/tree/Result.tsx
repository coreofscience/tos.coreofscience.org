import useFirebase from "../../hooks/useFirebase";
import { TreeMetadata } from "../../types/treeMetadata";
import { doc, onSnapshot } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    return <Fragment>Sowing your seeds now...</Fragment>;
  }

  // Return processing if startedDate and not finishedDate
  if (!treeMetadata.finishedDate) {
    return <Fragment>Your tree is taking roots...</Fragment>;
  }

  // Return error processing if there's an error
  if (treeMetadata.error || !treeMetadata.result) {
    return (
      <Fragment>Life is hard, there was an error growing your tree...</Fragment>
    );
  }

  return (
    <Tree
      treeSections={treeMetadata.result}
      analysis={treeMetadata._analysis ?? undefined}
      treePath={treePath}
      stars={treeMetadata.stars || {}}
    />
  );
};

export default Result;
