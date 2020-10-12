import md5 from "md5";
import { useCallback, useContext } from "react";

import FirebaseContext from "../context/FirebaseContext";
import FileContext from "../context/FileContext";
import {
  countArticles,
  countReferences,
  mostCommonKeywords,
} from "../utils/isiUtils";

const useUpload = () => {
  const { add, track } = useContext(FileContext);
  const firebase = useContext(FirebaseContext);

  const upload = useCallback(
    (name: string, blob: Blob) => {
      blob.text().then((text) => {
        if (firebase === null) return;
        const hash = md5(text);
        const metadata = {
          name,
          blob,
          hash,
          keywords: mostCommonKeywords(text, 3),
          articles: countArticles(text),
          citations: countReferences(text),
          valid: true,
        };
        add(metadata);
        const ref = firebase.storage().ref(`isi-files/${hash}`);

        ref
          .getDownloadURL()
          .then(() => {
            track(hash, 100);
          })
          .catch(() => {
            const task = ref.put(blob);
            task.on(
              "state_changed",
              (snapshot) => {
                const percent =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                track(hash, percent);
              },
              (error) => console.log,
              () => {
                track(hash, 100);
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
