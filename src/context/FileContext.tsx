import { FileContextType } from "../types/fileContextType";
import { createContext } from "react";

const FileContext = createContext<FileContextType>({
  add: () => {},
  remove: () => {},
  track: () => {},
  swap: () => {},
  progress: {},
  files: [],
});
FileContext.displayName = "FileContext";

export default FileContext;
