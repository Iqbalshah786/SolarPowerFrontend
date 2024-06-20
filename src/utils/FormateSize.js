const formatSize = (sizeInBytes) => {
  if (!sizeInBytes) {
    return "Size not available";
  }
  const i =
    sizeInBytes === 0 ? 0 : Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  return `${(sizeInBytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};
export default formatSize;
