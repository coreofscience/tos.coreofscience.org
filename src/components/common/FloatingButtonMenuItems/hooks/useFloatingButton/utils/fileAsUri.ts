export const fileAsUri = (csv: string): string => {
  const blob = new Blob([csv]);
  return URL.createObjectURL(blob);
};
