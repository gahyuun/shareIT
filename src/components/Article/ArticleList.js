import Article from '.';
import { getArticles, getNextArticles } from '../../apis/article';
import { Component } from '../../core/Component';
import { articlesStore } from '../../store/article';

export default class ArticleList extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    getArticles();
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
