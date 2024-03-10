import ArticleList from '.';
import { getArticles, getNextArticles } from '../../apis/article';

export default class HomeArticleList extends ArticleList {
  constructor(root = '', props = {}) {
    super(root, props);
    this.getArticles();
  }
  template() {
    const { articles } = this.state;
    if (!articles) {
      return this.renderSkeleton();
    }
    this.updateRenderingArticlesData(articles);
    return this.renderingArticlesData.join('');
  }
  setObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.getNextArticles();
        }
      });
    });
    if (typeof this.componentRoot.lastChild === HTMLElement)
      this.observer.observe(this.componentRoot.lastChild);
  }
  async getArticles() {
    const articles = await getArticles();
    this.setState({ articles });
  }
  async getNextArticles() {
    const articles = await getNextArticles();
    if (articles)
      this.setState({ articles: [...this.state.articles, ...articles] });
  }
}
