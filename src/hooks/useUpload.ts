import md5 from "md5";
import { useCallback, useContext } from "react";

import FirebaseContext from "../context/FirebaseContext";
import FileContext from "../context/FileContext";

const useUpload = () => {
  const { track } = useContext(FileContext);
  const firebase = useContext(FirebaseContext);

  const upload = useCallback(
    (name: string, blob: Blob) => {
      blob.text().then((text) => {
        if (firebase === null) return;
        const hash = md5(text);
        const ref = firebase.storage().ref(`isi-files/${hash}`);
        const task = ref.put(blob);
        task.on(
          "state_changed",
          (snapshot) => {
            const percent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            track(hash, percent);
          },
          (error) => {
            alert(error);
          },
          () => {
            track(hash, 100);
          }
        );
      });
    },
    [track, firebase]
  );

  return upload;
};

export default useUpload;
