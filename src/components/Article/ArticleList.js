import Article from '.';
import { getArticles, getNextArticles } from '../../apis/article';
import { Component } from '../../core/Component';
import { articlesStore } from '../../store/article';

export default class ArticleList extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    getArticles();
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
      console.log(i);
      const articleComponent = this.addChild(Article, this.componentRoot, {
        article,
      });
      this.renderingArticlesData.push(articleComponent.template());
    }

    this.setLastVisibleIndex(articles.length);
  }
  template() {
    const articles = articlesStore.state.articles;
    if (articles.length === 0) {
      return this.renderSkeleton();
    }
    this.updateRenderingArticlesData(articles);
    return this.renderingArticlesData.join('');
  }

  setObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getNextArticles();
        }
      });
    });
    if (this.componentRoot.lastChild)
      this.observer.observe(this.componentRoot.lastChild);
  }

  setEvent() {
    this.indexKey = articlesStore.subscribe('articles', () => {
      this.render();
    });
  }

  clearEvent() {
    this.eventListeners.map(({ eventType, eventListener }) => {
      this.componentRoot.removeEventListener(eventType, eventListener);
    });
    this.eventListeners = [];
    articlesStore.unSubscribe('articles', this.indexKey);
  }

  mounted() {
    this.setObserver();
  }
}
