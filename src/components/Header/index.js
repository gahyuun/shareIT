import { Component } from '../../core/Component';
import logo from '../../assets/logo.png';
import { userStore } from '../../store/user';
import { navigate } from '../../core/router';
import { ROUTES } from '../../constants/routes';
import { login } from '../../apis/user';

export default class Header extends Component {
  constructor(root) {
    super(root);
    this.indexKey = userStore.subscribe('user', () => {
      this.render();
    });
  }
  template() {
    const user = userStore.state.user;
    return `<header class="2xl:max-w-[81.25rem] mt-[1.6875rem] mx-auto xl:max-w-[75rem] lg:max-w-[56.25rem]">
                <section class="flex justify-between items-center">
                  <div class="flex items-center gap-[0.6875rem] cursor-pointer">
                    <img src="${logo}" alt="logo" class="w-[2.7rem] h-[2.5rem] navigateHome">
                    <div class="lg:text-3xl text-2xl font-bold text-primary navigateHome">shareIT</div>
                  </div>
                  ${
                    user === 'loading'
                      ? ''
                      : user === ''
                      ? '<button class="text-xl font-normal text-gray" id="loginButton">로그인</button>'
                      : `<button class="text-xl font-normal text-blue" id="navigateMy">
                          ${user.displayName}님
                        </button>`
                  }
                </section>
            </header>`;
  }
  setEvent() {
    this.addEvent('click', '#loginButton', login);

    this.addEvent('click', '#navigateMy', () => {
      navigate(ROUTES.MY);
    });
    this.addEvent('click', '.navigateHome', () => {
      navigate(ROUTES.HOME);
    });
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
