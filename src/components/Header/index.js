import { Component } from '../../core/Component';
import logo from '../../assets/logo.png';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../apis/firebase';
import { userStore } from '../../store/user';
import { navigate } from '../../core/router';
import { ROUTES } from '../../constants/routes';

export default class Header extends Component {
  constructor(root) {
    super(root);
    userStore.subscribe('user', () => {
      this.render();
    });
  }
  template() {
    const user = userStore.state.user;
    return `<header class="max-w-[81.25rem] mt-[1.6875rem] mx-auto">
                <section class="flex justify-between items-center">
                  <div class="flex items-center gap-[0.6875rem] cursor-pointer">
                    <img src="${logo}" alt="logo" class="w-[2.7rem] h-[2.5rem] navigateHome">
                    <div class="text-3xl font-bold text-primary navigateHome">shareIT</div>
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
    const provider = new GoogleAuthProvider();
    this.addEvent('click', '#loginButton', async () => {
      await signInWithPopup(auth, provider);
    });

    this.addEvent('click', '#navigateMy', () => {
      navigate(ROUTES.MY);
    });
    this.addEvent('click', '.navigateHome', () => {
      navigate(ROUTES.HOME);
    });
  }
}
