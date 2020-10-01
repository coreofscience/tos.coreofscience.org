import React, { FC } from 'react';
import styled from 'styled-components';

import { BlobMap } from '../../utils/customTypes';
import FileDiv from './FileDiv';
import FileCard from './FileCard';

// TODO: Use fluid grid https://gridbyexample.com/examples/example28/

const UploadZone = styled.div`
  margin-top: 10px;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

interface Props {
  files: BlobMap;
  onRemoveFile: (hash: string) => any;
}

const UploadIndicator: FC<Props> = ({ files, onRemoveFile }: Props) => {
  return (
    <UploadZone>
      <FileCard
        name='file.isi'
        articles={300}
        citations={3500}
        keywords={['hola', 'que', 'hace']}
        progress={30}
      />
      <FileCard
        name='file.isi'
        articles={5}
        citations={25}
        keywords={[
          'these',
          'are',
          'a',
          'lot',
          'of',
          'keywords',
          'big',
          'words',
          'words',
          'words',
          'words',
          'words',
          'words',
          'words',
        ]}
      />
      <FileCard
        name='very big file name.isi'
        articles={5}
        citations={25}
        keywords={['hola', 'que', 'hace']}
        progress={75}
      />
      {Object.entries(files).map(([hash, fileBlob]) => {
        return (
          <FileDiv
            key={hash}
            hash={hash}
            fileBlob={fileBlob}
            fileName={Object(fileBlob).name}
            onRemoveFile={onRemoveFile}
          />
        );
      })}
    </UploadZone>
  );
};

export default UploadIndicator;
