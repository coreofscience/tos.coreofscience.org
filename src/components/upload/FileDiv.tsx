import React, { FC, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import FirebaseContext from "../../context/firebase";
import {
  mostCommonKeywords,
  countArticles,
  countReferences,
} from "../../utils/isiUtils";
// TODO: Make it look like this https://www.figma.com/file/c3WgeyN7inEdtMxQHAqPga/tos.coreofcience.org?node-id=1%3A2

const FileCard = styled.div<{ hover?: boolean }>`
  width: 200px;
  padding: 20px;
  transition: 300ms;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  & span {
    margin-top: 1em;
  }

  & .article-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  & .close-button {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #000000;
    display: inline-block;
    z-index: 200;
    position: absolute;
    right: -10px;
    top: 8px;
    margin-left: -16px;
    margin-top: -16px;
    cursor: pointer;
  }

  & .close-button:before,
  & .close-button:after {
    content: "";
    width: 55%;
    height: 1px;
    background: #ffffff;
    position: absolute;
    top: 48%;
    left: 22%;
    transform: rotate(-45deg);
    transition: all 0.3s ease-out;
  }

  & .close-button:after {
    transform: rotate(45deg);
    transition: all 0.3s ease-out;
  }

  & .close-button:hover:before,
  & .close-button:hover:after {
    transform: rotate(180deg);
  }

  & progress {
    width: 90%;
    background: #c0c0c0;
    border-radius: 10px;
    padding: 2px;
    height: 10px;
    margin-top: 10px;
  }
  & progress::-moz-progress-bar,
  & progress::-webkit-progress-bar,
  & progress[bar] {
    border-radius: 10px;
    background: #4cac33;
  }
  & progress[value],
  & progress::-webkit-progress-value {
    border-radius: 10px;
  }

  & hr {
    width: 100%;
  }
`;

interface Props {
  hash: string;
  fileBlob: Blob;
  fileName: string;
  onRemoveFile: (file: string) => any;
}

const FileDiv: FC<Props> = ({
  hash,
  fileName,
  fileBlob,
  onRemoveFile,
}: Props) => {
  const [requiresUpload, setRequiresUpload] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [numArticles, setNumArticles] = useState<number>(0);
  const [numReferences, setNumReferences] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const app = useContext(FirebaseContext);

  const uploadFile = useEffect(() => {
    if (!app || !requiresUpload) return;
    const storageRef = app.storage().ref("isi_files/" + hash);
    const newTask = storageRef.put(fileBlob);
    const unsuscribe = newTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(percentage);
      },
      (err) => {
        alert(err.message);
      }
    );
    return () => unsuscribe();
  }, [hash, fileBlob, app, requiresUpload]);

  useEffect(() => {
    fileBlob.text().then((text) => {
      setKeywords(mostCommonKeywords(text, 3));
    });
  }, [fileBlob]);

  useEffect(() => {
    fileBlob.text().then((text) => {
      setNumArticles(countArticles(text));
    });
  }, [fileBlob]);

  useEffect(() => {
    fileBlob.text().then((text) => {
      setNumReferences(countReferences(text));
    });
  }, [fileBlob]);

  useEffect(() => {
    if (!app) return;
    const storageRef = app.storage().ref("isi_files/" + hash);
    storageRef
      .getDownloadURL()
      .then(() => {
        setUploadProgress(100);
      })
      .catch(() => {
        setRequiresUpload(true);
      });
  }, [app, hash, uploadFile]);

  return (
    <FileCard>
      <h3 className="article-title">{fileName}</h3>
      <span>
        <strong>Keywords: </strong>
        {keywords.join("; ")}
      </span>
      <span>
        {numArticles} {numArticles > 1 ? "articles" : "article"}
      </span>
      <span>
        {numReferences} {numReferences > 1 ? "references" : "reference"}
      </span>
      <progress value={uploadProgress} max={100} />
      <div className="close-button" onClick={() => onRemoveFile(hash)} />
    </FileCard>
  );
};

export default FileDiv;
