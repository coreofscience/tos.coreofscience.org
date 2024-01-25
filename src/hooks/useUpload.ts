import FileContext from "../context/FileContext";
import metadata from "../utils/metadata";
import useFirebase from "./useFirebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useContext } from "react";

const useUpload = () => {
  const { add, track } = useContext(FileContext);
  const firebase = useFirebase();

  return useCallback(
    (name: string, blob: Blob) => {
      metadata(name, blob).then((meta) => {
        add(meta);
        const fileRef = ref(firebase.storage, `isi-files/${meta.hash}`);
        getDownloadURL(fileRef)
          .then(() => {
            track(meta.hash, 100);
          })
          .catch(() => {
            const uploadTask = uploadBytesResumable(fileRef, blob);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                track(meta.hash, percent);
              },
              () => {},
              () => {
                track(meta.hash, 100);
              },
            );
          });
      });
    },
    [add, track, firebase],
  );
};

export default useUpload;
