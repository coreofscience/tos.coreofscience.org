import md5 from "md5";
import { useCallback, useContext } from "react";

import FirebaseContext from "../context/FirebaseContext";
import useTrackProgress from "./useTrackProgress";

const useUpload = () => {
  const track = useTrackProgress();
  const firebase = useContext(FirebaseContext);

  const upload = useCallback(
    (name: string, blob: Blob) => {
      console.log("Uploading", { name, blob });
      blob.text().then((text) => {
        if (firebase === null) return;
        const hash = md5(text);
        const ref = firebase.storage().ref(`isi-files/${hash}`);
        const task = ref.put(blob);
        task.on("state_changed", (snapshot) => {
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          track(hash, percent);
        });
      });
    },
    [track, firebase]
  );

  return upload;
};

export default useUpload;
