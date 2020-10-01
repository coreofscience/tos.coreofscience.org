import React, { FC, useState } from 'react';
import FileDropper from './FileDropper';
import UploadIndicator from './UploadIndicator';
import { BlobMap } from '../../utils/customTypes';
import './Home.css';
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
      <div>
        <p>Get your seed files from web of knowledge.</p>
        <p>The upload your files for processing.</p>
      </div>
      <FileDropper onNewFiles={appendFiles} />
      <UploadIndicator files={validFiles} onRemoveFile={removeFile} />
      <p>Review your input:</p>
      <div className='information-cant-article'>
        <div className='frame-article'>
          <span className='total-articles'>500/800 </span>
          <span className='articles'>article</span>
        </div>
        <div className='frame-article'>
          <span className='total-articles'>500/800 </span>
          <span className='articles'>citations</span>
        </div>
      </div>
      <br></br>
      <div>Time to create your Tree of Science.</div>
      <div className='button-coninue'>CONTINUE</div>
    </main>
  );
};
export default Home;
