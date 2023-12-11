export const downloadFile = (uri: string, fileName: string) => {
  const a = document.createElement("a");
  a.setAttribute("href", uri);
  a.setAttribute("download", fileName);
  a.click();
  a.remove();
};
