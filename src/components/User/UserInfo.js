import { Component } from '../../core/Component';
import { userStore } from '../../store/user';
import { logout } from '../../apis/user';

export default class UserInfo extends Component {
  template() {
    const user = userStore.state.user;
    return `
    <img src="${user.photoURL}" class="w-[8.125rem] h-full rounded-full"/>
    <section class="flex flex-col justify-between py-[0.4rem]">
            <div class="text-[2rem] font-semibold text-primary">${user.displayName}님</div>
            <button class="border border-solid border-lightGray rounded-3xl w-[7.875rem] h-[2.75rem] text-xl font-normal"
            id="logoutButton">
                로그아웃
            </button>
    </section>
    `;
  }
  setEvent() {
    this.addEvent('click', '#logoutButton', async () => {
      await logout();
    });
  }
}
