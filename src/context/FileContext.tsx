import { createContext } from "react";
import { FileContexType } from "../utils/customTypes";

const FileContext = createContext<FileContexType>({
  add: () => {},
  remove: () => {},
  track: () => {},
  swap: () => {},
  progress: {},
  files: [],
});
FileContext.displayName = "FileContext";

export default FileContext;
