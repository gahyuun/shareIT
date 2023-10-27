export const sliceContent = (articlesArray, startIndex, endIndex) => {
  for (const article of articlesArray) {
    article.content = article.content.substr(startIndex, endIndex);
  }
};

export const dateFormat = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};
