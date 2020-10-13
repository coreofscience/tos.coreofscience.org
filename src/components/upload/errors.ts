export const MAX_FILE_SIZE = 5; // megabytes

const FileErrorMap = {
  isi: "does not look like an ISI valid file",
  max_size: `has a size greater than the max allowed: ${MAX_FILE_SIZE} MB`,
};

export default FileErrorMap;
