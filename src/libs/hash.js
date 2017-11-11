export default string => {
  let hash = 5381;
  let i = string.length;
  while (i) {
    hash = (hash * 33) ^ string.charCodeAt(--i);
  }
  return `_${hash >>> 0}`;
};
