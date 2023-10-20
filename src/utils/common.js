export const sliceContent = (articlesArray, startIndex, endIndex) => {
  for (const article of articlesArray) {
    article.content = article.content.substr(startIndex, endIndex);
  }
};
