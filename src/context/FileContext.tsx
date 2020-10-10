import { createContext } from "react";
import { FileContexType } from "../utils/customTypes";

const FileContext = createContext<FileContexType>({
  add: () => {},
  remove: () => {},
  track: () => {},
  progress: {},
  files: [],
});
FileContext.displayName = "FileContext";

export default FileContext;
