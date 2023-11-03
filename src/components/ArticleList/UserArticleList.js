import ArticleList from '.';
import { getNextUserArticles, getUserArticles } from '../../apis/article';

export default class UserArticleList extends ArticleList {
  constructor(root = '', props = {}) {
    super(root, props);
    this.uid = props.uid;
    this.getUserArticles();
  }
  template() {
    const { userArticles } = this.state;
    if (!userArticles) return this.renderSkeleton();

    this.updateRenderingArticlesData(userArticles);
    return this.renderingArticlesData.join('');
  }
  setObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('user article intersection observer');
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
}
