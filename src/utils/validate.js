export const existFile = (file) => {
  if (file.name === '') {
    return false;
  }
  return true;
};
