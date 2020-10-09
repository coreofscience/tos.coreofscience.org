import { createContext } from "react";
import { FileContexType } from "../utils/customTypes";

const FileContext = createContext<FileContexType>({
  upload: () => {},
  remove: () => {},
  files: [],
});
FileContext.displayName = "FileContext";

export default FileContext;
