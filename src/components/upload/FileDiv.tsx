import React, { FC, useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import FirebaseContext from "../../context/firebase";
import {
  mostCommonKeywords,
  countArticles,
  countReferences,
} from "../../utils/isiUtils";
// TODO: Make it look like this https://www.figma.com/file/c3WgeyN7inEdtMxQHAqPga/tos.coreofcience.org?node-id=1%3A2

const FileCard = styled.div<{ hover?: boolean }>`
  background-color: ${({ hover }) => (hover ? "pink" : "#f3f3f3")};
  border: 2px solid black;
  width: 200px;
  border-radius: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  padding: 20px;
  transition: 300ms;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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
  const [hover, setHover] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [numArticles, setNumArticles] = useState<number>(0);
  const [numReferences, setNumReferences] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [task, setTask] = useState<firebase.storage.UploadTask>();
  const app = useContext(FirebaseContext);

  const uploadFile = useCallback(() => {
    if (!app) return;
    const storageRef = app.storage().ref("isi_files/" + hash);
    const newTask = storageRef.put(fileBlob);
    setTask(newTask);

    newTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(percentage);
      },

      (err) => {
        alert(err.message);
      },

      () => {
        // when completed
      }
    );
  }, [hash, fileBlob, app]);

  useEffect(() => {
    fileBlob.text().then((text) => {
      setKeywords(mostCommonKeywords(text, 3));
    });
  });

  useEffect(() => {
    fileBlob.text().then((text) => {
      setNumArticles(countArticles(text));
    });
  });

  useEffect(() => {
    fileBlob.text().then((text) => {
      setNumReferences(countReferences(text));
    });
  });

  useEffect(() => {
    if (!app) return;
    const storageRef = app.storage().ref("isi_files/" + hash);
    storageRef
      .getDownloadURL()
      .then(() => {
        setUploadProgress(100);
      })
      .catch(() => {
        uploadFile();
      });
  }, [app, hash, uploadFile]);

  const onRemove = () => {
    onRemoveFile(hash);
    if (task) {
      task.cancel();
    }
  };

  return (
    <FileCard hover={hover}>
      <h3 className="article-title">{fileName}</h3>
      <hr />
      <span>
        <strong>Keywords: </strong>
        {keywords.join("; ")}
      </span>
      <hr />
      <span>
        {numArticles} {numArticles > 1 ? "articles" : "article"}
      </span>
      <span>
        {numReferences} {numReferences > 1 ? "references" : "reference"}
      </span>
      <progress value={uploadProgress} max={100} />
      <div
        className="close-button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onRemove}
      />
    </FileCard>
  );
};

export default FileDiv;
