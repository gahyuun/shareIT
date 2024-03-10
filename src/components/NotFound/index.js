import { ROUTES } from '../../constants/routes';
import { Component } from '../../core/Component';
import { navigate } from '../../core/router';

export default class NotFound extends Component {
  template() {
    return `
    <main class="max-w-[46.875rem] mx-auto mt-[12rem] flex flex-col justify-center items-center gap-12">
       <div class="text-8xl text-blue">404</div>
       <div class="flex flex-col gap-6">
            <div class="text-xl">아무것도 없네요</div>
            <button class="bg-blue hover:bg-blue300 text-white w-[8rem] h-[2.3125rem] px-[0.5rem] rounded-md navigateHome">
            홈으로
            </button>
       </div>
    </main>
`;
  }
  setEvent() {
    this.addEvent('click', '.navigateHome', () => {
      navigate(ROUTES.HOME);
    });
  }
}
