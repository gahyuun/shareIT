import Article from '.';
import { getNextUserArticles, getUserArticles } from '../../apis/article';
import { Component } from '../../core/Component';
import { articlesStore } from '../../store/article';

export default class UserArticleList extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    this.uid = props.uid;
    getUserArticles(this.uid);
  }
  template() {
    const userArticlesMap = articlesStore.state.userArticles?.map((article) => {
      const articleComponent = this.addChild(Article, this.componentRoot, {
        article,
      });
      return articleComponent.template();
    });

    const skeletonArray = new Array(4).fill('');

    if (userArticlesMap.length === 0) {
      return skeletonArray
        .map(
          (_, index) =>
            `<section key=${index} class="animate-pulse w-[18.75rem] h-[20rem] bg-slate-100 border-solid rounded-xl pb-1"></section>`,
        )
        .join('');
    }
    return userArticlesMap.join('');
  }
  setObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getNextUserArticles(this.uid);
        }
      });
    });
    if (this.componentRoot.lastChild)
      observer.observe(this.componentRoot.lastChild);
  }
  setEvent() {
    this.indexKey = articlesStore.subscribe('userArticles', () => {
      this.render();
    });
  }
  clearEvent() {
    this.eventListeners.map(({ eventType, eventListener }) => {
      this.componentRoot.removeEventListener(eventType, eventListener);
    });
    this.eventListeners = [];
    articlesStore.unSubscribe('userArticles', this.indexKey);
  }
  mounted() {
    this.setObserver();
  }
}
