import Article from '.';
import { getArticles, getNextArticles } from '../../apis/article';
import { Component } from '../../core/Component';

export default class ArticleList extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    this.getArticles();
    this.lastVisibleIndex = 0;
    this.renderingArticlesData = [];
  }

  setLastVisibleIndex(lastVisibleIndex) {
    this.lastVisibleIndex = lastVisibleIndex;
  }
  renderSkeleton() {
    const skeletonArray = new Array(8).fill('');
    return skeletonArray
      .map(
        (_, index) =>
          `<section key=${index} class="animate-pulse w-[18.75rem] h-[20rem] bg-slate-100 border-solid rounded-xl pb-1"></section>`,
      )
      .join('');
  }
  updateRenderingArticlesData(articles) {
    for (let i = this.lastVisibleIndex; i < articles.length; i++) {
      const article = articles[i];
      const articleComponent = this.addChild(Article, this.componentRoot, {
        article,
      });
      this.renderingArticlesData.push(articleComponent.template());
    }
    this.setLastVisibleIndex(articles.length);
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
    if (this.componentRoot.lastChild) {
      this.observer.observe(this.componentRoot.lastChild);
    }
  }
  clearEvent() {
    this.eventListeners.map(({ eventType, eventListener }) => {
      this.componentRoot.removeEventListener(eventType, eventListener);
    });
    this.eventListeners = [];
    if (this.componentRoot.lastChild)
      this.observer.unobserve(this.componentRoot.lastChild);
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
  mounted() {
    this.setObserver();
  }
}
