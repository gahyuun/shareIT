import ArticleList from '../../components/Article/ArticleList';
import { ROUTES } from '../../constants/routes';
import { Component } from '../../core/Component';
import { navigate } from '../../core/router';

export default class Home extends Component {
  template() {
    const articleListComponent = this.addChild(ArticleList, '#articleList');
    return `<section class="2xl:max-w-[81.25rem] mx-auto xl:max-w-[75rem] lg:max-w-[58rem]">
              <nav class="md:pt-[4.25rem] pt-[2rem] lg:px-0 px-[0.5rem]">
                <ul>
                  <li class="md:text-5xl font-bold text-primary text-3xl">shareIT</li>
                  <li class="md:text-2xl font-semibold text-primary mt-[0.75rem] text-lg">개발자 아티클 공유 서비스</li>
                  <li class="md:text-xl font-normal text-gray md:mt-[1.6875rem] mt-[1rem] text-base">아티클과 아티클에 대한 당신의 생각을 공유해주세요!</li>
                  <button class="bg-blue text-white w-[8rem] h-[2.3125rem] px-[0.5rem] rounded-md mt-8" id="navigateWrite">
                  공유하러 가기
                  </button>
                </ul>
              </nav>
              <main id="articleList" class="lg:pt-[7.5rem] pt-[4rem] md:grid xl:grid-cols-4 flex items-center justify-center flex-col
              lg:grid-cols-3 md:grid-cols-2 gap-y-16">
              ${articleListComponent.template()}</main></section>
            `;
  }
  setEvent() {
    this.addEvent('click', '#navigateWrite', () => {
      navigate(ROUTES.WRITE);
    });
  }
}
