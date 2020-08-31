import React, { FC, useState } from "react";
import styled from "styled-components";

import FileDropper from "./components/FileDropper";
import UploadIndicator from "./components/UploadIndicator";

import { BlobMap } from "./utils/customTypes";

const AppLayout = styled.div`
  margin: 0 10px;
  max-width: 960px;

  @media (min-width: 720px) {
    & {
      margin-left: 10%;
    }
  }
`;

const App: FC<{}> = () => {
  const [validFiles, setValidFiles] = useState<BlobMap>({});

  const appendFiles = (files: BlobMap) => {
    setValidFiles((current) => ({ ...current, ...files }));
  };

  return (
    <AppLayout>
      <header>
        <h1>SAP</h1>
      </header>
      <main>
        <FileDropper onNewFiles={appendFiles} />
        <UploadIndicator files={validFiles} />
        <div>Summary.</div>
        <div>Action button</div>
      </main>
      <footer>References</footer>
    </AppLayout>
  );
};

export default App;
