import { Component } from '../../core/Component';
import { userStore } from '../../store/user';
import UserArticleList from '../../components/Article/UserArticleList';
import UserInfoSkeleton from '../../components/User/UserInfoSkeleton';
import UserInfo from '../../components/User/UserInfo';

export default class My extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
  }
  template() {
    const user = userStore.state.user;
    if (user === 'loading') {
      const userInfoSkeleton = this.addChild(
        UserInfoSkeleton,
        this.componentRoot,
      );
      return userInfoSkeleton.template();
    }
    const userArticleListComponent = this.addChild(
      UserArticleList,
      '#userArticleList',
      { uid: user.uid },
    );
    const userInfo = this.addChild(UserInfo, '#userInfo');

    return `<article class="max-w-[46.875rem] h-[8.125rem] mx-auto mt-[8.4375rem] flex gap-[4rem]" id="userInfo">
                  ${userInfo.template()}
            </article>
            <main class="max-w-[46.875rem] mx-auto mt-[4.6875rem] pl-[0.75rem]">
              <section class="flex flex-col gap-[1.3rem]">
                <div class="text-3xl font-semibold text-blue200">작성한 글</div>
                <div class="border-b border-gray"></div>
              </section>
              <div class="flex justify-center">
                <section id="userArticleList"class="pt-[2.5rem] grid grid-cols-2 gap-y-12 gap-x-12">
                ${userArticleListComponent.template()}
                </section>
              </div>
            </main>`;
  }
  setEvent() {
    this.indexKey = userStore.subscribe('user', () => {
      this.render();
    });
  }
  clearEvent() {
    this.eventListeners.map(({ eventType, eventListener }) => {
      this.componentRoot.removeEventListener(eventType, eventListener);
    });
    this.eventListeners = [];
    userStore.unSubscribe('user', this.indexKey);
  }
}
