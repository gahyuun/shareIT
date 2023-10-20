import Article from '.';
import { getArticles } from '../../apis/article';
import { Component } from '../../core/Component';
import { articlesStore } from '../../store/article';

export default class ArticleList extends Component {
  constructor(root) {
    super(root);
    getArticles();
    articlesStore.subscribe('articles', () => {
      this.render();
    });
  }
  template() {
    const articlesMap = articlesStore.state.articles?.map((article) => {
      const articleComponent = this.addChild(
        Article,
        this.componentRoot,
        article,
      );
      return articleComponent.template();
    });
    return articlesMap.join('');
  }
}
