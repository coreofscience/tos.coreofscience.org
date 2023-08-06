const FileErrorMap = {
  not_supported: "does not look like a valid ISI file",
  max_size: (maxSize: number) => `is too big to process (max. ${maxSize}MB)`,
};

export default FileErrorMap;
