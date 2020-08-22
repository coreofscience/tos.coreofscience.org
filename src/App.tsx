import React, { FC } from "react";
import styled from "styled-components";

import FileDropper from "./components/FileDropper";
import UploadIndicator from "./components/UploadIndicator";

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
  return (
    <AppLayout>
      <header>
        <h1>SAP</h1>
      </header>
      <main>
        <FileDropper />
        <UploadIndicator />
        <div>Summary.</div>
        <div>Action button</div>
      </main>
      <footer>References</footer>
    </AppLayout>
  );
};

export default App;
