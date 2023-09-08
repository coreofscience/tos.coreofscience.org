import { createContext } from "react";

import { FileContextType } from "../types/fileContextType";

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
