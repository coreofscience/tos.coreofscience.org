import React, { FC } from 'react';
import FileDropper from './FileDropper';
import UploadIndicator from './UploadIndicator';

const Home: FC<{}> = () => {
  return (
    <main>
      <FileDropper />
      <UploadIndicator />
      <div>Summary.</div>
      <div>Action button</div>
    </main>
  );
};
export default Home;
