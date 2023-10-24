import Article from '.';
import { getArticles } from '../../apis/article';
import { Component } from '../../core/Component';
import { articlesStore } from '../../store/article';

export default class ArticleList extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    getArticles();
    articlesStore.subscribe('articles', () => {
      this.render();
    });
  }
  template() {
    const articlesMap = articlesStore.state.articles?.map((article) => {
      const articleComponent = this.addChild(Article, this.componentRoot, {
        article,
      });
      return articleComponent.template();
    });

    const skeletonArray = new Array(8).fill('');

    if (articlesMap.length === 0) {
      return skeletonArray
        .map(
          (_, index) =>
            `<section key=${index} class="animate-pulse w-[18.75rem] h-[20rem] bg-slate-100 border-solid rounded-xl pb-1"></section>`,
        )
        .join('');
    }
    return articlesMap.join('');
  }
}
