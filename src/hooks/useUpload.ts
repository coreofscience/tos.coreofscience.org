import { useCallback, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import FileContext from "../context/FileContext";
import metadata from "../utils/metadata";
import useFirebase from "./useFirebase";

const useUpload = () => {
  const { add, track } = useContext(FileContext);
  const firebase = useFirebase();

  const upload = useCallback(
    (name: string, blob: Blob) => {
      metadata(name, blob).then((meta) => {
        add(meta);
        const fileRef = ref(firebase.storage, `isi-files/${meta.hash}`);
        getDownloadURL(fileRef)
          .then((downloadURL) => {
            console.info(`File is already saved with url: ${downloadURL}`);
            track(meta.hash, 100);
          })
          .catch((err) => {
            const uploadTask = uploadBytesResumable(fileRef, blob);
            uploadTask.on(
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
