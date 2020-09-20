import React, { FC, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { firebaseApp } from "../../firebaseApp";
import * as firebase from "firebase";

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

  const getKeywordsList = (text: string) => {
    const identifier = "ID ";
    const keywordsLines = text
      .split("\n")
      .filter((line) => line.startsWith(identifier));
    return keywordsLines
      .map((line) =>
        line
          .replace(identifier, "")
          .trim()
          .split(";")
          .map((keyword) => keyword.trim().toLowerCase())
          .filter((keyword) => Boolean(keyword))
      )
      .flat();
  };

  const mostCommonKeywords = useCallback((text: string, max: number = 3) => {
    const keywordsList = getKeywordsList(text);
    let count: { [keyword: string]: number } = {};
    for (let keyword of keywordsList) {
      count[keyword] = (count[keyword] ? count[keyword] : 0) + 1;
    }
    const sortCount = Object.entries(count).sort((first, second) =>
      first[1] < second[1] ? 1 : -1
    );
    return sortCount.slice(0, max).map((item) => item[0]);
  }, []);

  const countArticles = (text: string) => {
    const identifier = "PT ";
    return text.split("\n").filter((line) => line.startsWith(identifier))
      .length;
  };

  const countReferences = (text: string) => {
    const identifier = "NR ";
    return text
      .split("\n")
      .filter((line) => line.startsWith(identifier))
      .map((line) => parseInt(line.replace(identifier, "")))
      .reduce((n, m) => n + m);
  };

  const fileExists = useCallback(() => {
    const storageRef = firebaseApp.storage().ref("isi_files/" + hash);
    return storageRef
      .getDownloadURL()
      .then(() => true)
      .catch(() => false);
  }, [hash]);

  const uploadFile = useCallback(() => {
    const storageRef = firebaseApp.storage().ref("isi_files/" + hash);
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
  }, [hash, fileBlob]);

  useEffect(() => {
    fileBlob.text().then((text) => {
      setKeywords(mostCommonKeywords(text, 3));
      setNumArticles(countArticles(text));
      setNumReferences(countReferences(text));
    });
    fileExists().then((exists) => {
      if (exists) {
        setUploadProgress(100);
      } else {
        uploadFile();
      }
    });
  }, [fileBlob, mostCommonKeywords, uploadFile, fileExists]);

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
