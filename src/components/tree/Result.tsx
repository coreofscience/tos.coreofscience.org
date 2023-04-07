import React, { Fragment, useEffect, useState } from "react";

import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router";
import useFirebase from "../../hooks/useFirebase";

import Tree from "./Tree";
import NotFound from "../NotFound";

import {TreeMetadata} from "../../types/treeMetadata";

const Result = () => {
  const { treeId } = useParams<{ treeId?: string }>();
  const firebase = useFirebase();
  const [treeMetadata, setTreeMetadata] = useState<
    TreeMetadata | null | "loading"
  >("loading");

  useEffect(() => {
    if (!treeId) {
      throw new Error("A tree id must be provided in the url");
    }

    const threePath = `trees/${treeId}`;
    const treeDoc = doc(firebase.firestore, threePath);

    const unsubscribe = onSnapshot(
      treeDoc,
      { includeMetadataChanges: true },
      (doc) => {
        if (!doc.exists()) {
          throw new Error(`Unable to get tree data from path: ${threePath}.`);
        }
        /**
         * TODO: find a way to set `TreeMetadata` type through the `threeRef` retrieval function.
         */
        setTreeMetadata(doc.data() as TreeMetadata);
      }
    );

    return () => unsubscribe();
  }, [firebase, treeId]);

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

  return <Tree treeSections={treeMetadata.result} treeId={treeId} />;
};

export default Result;
