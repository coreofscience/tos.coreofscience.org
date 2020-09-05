import React, { FC, useState } from "react";
import FileDropper from "./FileDropper";
import UploadIndicator from "./UploadIndicator";
import { BlobMap } from "../utils/customTypes";

const Home: FC<{}> = () => {
  const [validFiles, setValidFiles] = useState<BlobMap>({});

  const appendFiles = (files: BlobMap) => {
    setValidFiles((current) => ({ ...current, ...files }));
  };

  const removeFile = (hash: string) => {
    let newFiles = { ...validFiles };
    delete newFiles[hash];
    setValidFiles({ ...newFiles });
  };
  return (
    <main>
      <FileDropper onNewFiles={appendFiles} />
      <UploadIndicator files={validFiles} onRemoveFile={removeFile} />
      <div>Summary.</div>
      <div>Action button</div>
    </main>
  );
};
export default Home;
