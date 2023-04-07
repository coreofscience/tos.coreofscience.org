export const MAX_FILE_SIZE = 5; // megabytes

const FileErrorMap = {
  not_supported: "does not look like a valid ISI file",
  max_size: `is too big to process (max. ${MAX_FILE_SIZE}MB)`,
};

export default FileErrorMap;
