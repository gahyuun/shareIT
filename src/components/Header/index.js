import { Component } from '../../core/Component';
import logo from '../../assets/logo.png';

export default class Header extends Component {
  template() {
    return `<header class="max-w-[81.25rem] mt-[1.6875rem] mx-auto">
                <section class="flex justify-between items-center">
                  <div class="flex items-center gap-[0.6875rem]">
                    <img src="${logo}" alt="logo" class="w-[2.7rem] h-[2.5rem] cursor-pointer">
                    <div class="text-3xl font-bold text-primary">shareIT</div>
                  </div>
                  <button class="text-xl font-normal text-gray">로그인</button>
                </section>
            </header>`;
  }
}
