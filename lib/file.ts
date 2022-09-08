export const baseName = (fileName: string) => {
  const dotPos = fileName.lastIndexOf(".");
  if (dotPos > 0) {
    return fileName.substring(0, dotPos);
  }
  throw new Error(`Unexpected filename ${fileName}`);
};

export const extension = (fileName: string) => {
  const dotPos = fileName.lastIndexOf(".");
  if (dotPos < fileName.length - 1) {
    return fileName.substring(dotPos + 1);
  }
  throw new Error(`Extension not found: ${fileName}`);
};

export const addSubExtension = (fileName: string, subExtension: string) => {
  return `${baseName(fileName)}.${subExtension}.${extension(fileName)}`;
};
