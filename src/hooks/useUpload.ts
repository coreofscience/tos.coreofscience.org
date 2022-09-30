import { useCallback, useContext } from "react";

import FileContext from "../context/FileContext";
import metadata from "../utils/metadata";
import { useFirebase } from "./useFirebase";

const useUpload = () => {
  const { add, track } = useContext(FileContext);
  const firebase = useFirebase();

  const upload = useCallback(
    (name: string, blob: Blob) => {
      metadata(name, blob).then((meta) => {
        add(meta);
        const ref = firebase.storage().ref(`isi-files/${meta.hash}`);

        ref
          .getDownloadURL()
          .then(() => {
            track(meta.hash, 100);
          })
          .catch(() => {
            const task = ref.put(blob);
            task.on(
              "state_changed",
              (snapshot) => {
                const percent =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                track(meta.hash, percent);
              },
              () => console.error,
              () => {
                track(meta.hash, 100);
              }
            );
          });
      });
    },
    [add, track, firebase]
  );

  return upload;
};

export default useUpload;
