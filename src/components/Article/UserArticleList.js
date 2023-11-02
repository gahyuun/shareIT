import Article from '.';
import { getNextUserArticles, getUserArticles } from '../../apis/article';
import { Component } from '../../core/Component';

export default class UserArticleList extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    this.uid = props.uid;
    this.getUserArticles();
    this.lastVisibleIndex = 0;
    this.renderingUserArticlesData = [];
  }

  renderSkeleton() {
    const skeletonArray = new Array(4).fill('');

    return skeletonArray
      .map(
        (_, index) =>
          `<section key=${index} class="animate-pulse w-[18.75rem] h-[20rem] bg-slate-100 border-solid rounded-xl pb-1"></section>`,
      )
      .join('');
  }

  setLastVisibleIndex(lastVisibleIndex) {
    this.lastVisibleIndex = lastVisibleIndex;
  }

  updateRenderingUserArticlesData(userArticles) {
    for (let i = this.lastVisibleIndex; i < userArticles.length; i++) {
      const article = userArticles[i];
      const articleComponent = this.addChild(Article, this.componentRoot, {
        article,
      });
      this.renderingUserArticlesData.push(articleComponent.template());
    }
    this.setLastVisibleIndex(userArticles.length);
  }
  template() {
    const { userArticles } = this.state;
    if (!userArticles) return this.renderSkeleton();

    this.updateRenderingUserArticlesData(userArticles);
    return this.renderingUserArticlesData.join('');
  }
  setObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.getNextUserArticles(this.uid);
        }
      });
    });
    if (this.componentRoot.lastChild)
      this.observer.observe(this.componentRoot.lastChild);
  }
  async getUserArticles() {
    const userArticles = await getUserArticles(this.uid);
    this.setState({ userArticles });
  }
  async getNextUserArticles() {
    const userArticles = await getNextUserArticles(this.uid);
    if (userArticles)
      this.setState({
        userArticles: [...this.state.userArticles, ...userArticles],
      });
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
