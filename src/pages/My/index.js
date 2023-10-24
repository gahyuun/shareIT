import { Component } from '../../core/Component';
import { userStore } from '../../store/user';
import { logout } from '../../apis/user';

export default class My extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    userStore.subscribe('user', () => {
      this.render();
    });
  }
  template() {
    const user = userStore.state.user;
    return `<article class="max-w-[46.875rem] h-[8.125rem] mx-auto mt-[8.4375rem] flex gap-[4rem]">
                  ${
                    user === 'loading'
                      ? ''
                      : `<img src="${user.photoURL}" class="w-[8.125rem] h-full rounded-full"/>
                  <section class="flex flex-col justify-between py-[0.4rem]">
                  <div class="text-[2rem] font-semibold text-primary">${user.displayName}님</div>
                  <button class="border border-solid border-lightGray rounded-3xl w-[7.875rem] h-[2.75rem] text-xl font-normal"
                  id="logoutButton"
                  >로그아웃</button>
                  </section>`
                  }
            </article>
            <main class="max-w-[46.875rem] mx-auto mt-[4.6875rem] pl-[0.75rem]">
              <section class="flex flex-col gap-[1.3rem]">
                <div class="text-3xl font-semibold text-blue200">작성한 글</div>
                <div class="border-b border-gray"></div>
              </section>
              <div class="flex justify-center">
              <section id="userArticleList"class="pt-[2.5rem] grid grid-cols-2 gap-y-12 gap-x-12">
              </section></div>
            </main>`;
  }
  setEvent() {
    this.addEvent('click', '#logoutButton', logout);
  }
}
