import React, { Fragment, useEffect, useState } from "react";

import Tree from "./Tree";
import { useParams } from "react-router";
import NotFound from "../NotFound";
import { useFirebase } from "../../hooks/useFirebase";

interface Metadata {
  createdDate: number;
  files: string[];
  startedDate?: number;
  finishedDate?: number;
  result?: string;
  error?: string;
}

const Result = () => {
  const { treeId } = useParams<{ treeId: string }>();
  const firebase = useFirebase();
  const [metadata, setMetada] = useState<Metadata | null | "loading">(
    "loading"
  );
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const treeRef = firebase.database().ref(`trees/${treeId}`);
    treeRef?.on("value", (snapshot) => {
      setMetada(snapshot.val());
    });
    return () => treeRef?.off();
  }, [firebase, treeId]);

  useEffect(() => {
    if (metadata === null || metadata === "loading" || !metadata.result) return;
    firebase
      .firestore()
      .doc(metadata.result)
      .get()
      .then((ref) => {
        ref.exists && setData(ref.data());
      })
      .catch((err) => console.error(err));
  }, [firebase, metadata]);

  if (metadata === "loading") {
    return <Fragment>Loading...</Fragment>;
  }

  // Return not found if there's no tree with the requested id
  if (metadata === null) {
    return <NotFound />;
  }

  // Return waiting for a worker if not startedDate
  if (!metadata.startedDate) {
    return <Fragment>Waiting for a worker to process your tree...</Fragment>;
  }

  // Return processing if startedDate and not finishedDate
  if (!metadata.finishedDate) {
    return <Fragment>Currently processing your tree...</Fragment>;
  }

  // Return error processing if there's an error
  if (metadata.error) {
    return (
      <Fragment>
        Life is hard, there was an error creating your tree...
      </Fragment>
    );
  }
  // Return we lost your data if the result file is missing
  // Return <Tree /> with the correct data if the data is available
  if (!data) {
    return <Fragment>Life is hard, we're getting your data...</Fragment>;
  }

  return <Tree data={data} treeId={treeId} />;
};

export default Result;
