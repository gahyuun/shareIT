import { Component } from '../../core/Component';
import { userStore } from '../../store/user';
import { logout } from '../../apis/user';

export default class UserInfo extends Component {
  template() {
    const user = userStore.state.user;
    return `
    <img src="${user.photoURL}"  alt="userImage" class="sm:w-[8.125rem] w-[6.5rem] sm:h-full h-[6.5rem] rounded-full"/>
    <section class="flex flex-col sm:justify-between sm:py-[0.4rem] sm:gap-0 gap-5">
            <div class="sm:text-[2rem] font-semibold text-primary text-2xl">${user.displayName}님</div>
            <button class="border border-solid border-lightGray rounded-3xl w-[7.875rem] sm:h-[2.75rem] h-[2.2rem] 
            text-xl font-normal" id="logoutButton">
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
