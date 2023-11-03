import { Component } from '../../core/Component';
import Article from '../Article';

export default class ArticleList extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
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

  clearEvent() {
    this.eventListeners.map(({ eventType, eventListener }) => {
      this.componentRoot.removeEventListener(eventType, eventListener);
    });
    this.eventListeners = [];
    if (this.componentRoot.lastChild)
      this.observer.unobserve(this.componentRoot.lastChild);
  }

  mounted() {
    this.setObserver();
  }
}
