import Article from '../../components/Article';
import ArticleList from '../../components/Article/ArticleList';
import { Component } from '../../core/Component';
import { navigate } from '../../core/router';

export default class Home extends Component {
  template() {
    const articleListComponent = this.addChild(ArticleList, this.componentRoot);
    return `<nav class="max-w-[81.25rem] mx-auto pt-[4.25rem]" id="home">
              <ul>
              <li class="text-5xl font-bold text-primary">shareIT</li>
              <li class="text-2xl font-semibold text-primary mt-[0.75rem]">개발자 아티클 공유 서비스</li>
              <li class="text-xl font-normal text-gray mt-[1.6875rem]">아티클과 아티클에 대한 당신의 생각을 공유해주세요!</li>
              <button class="bg-blue text-white w-[8rem] h-[2.3125rem] px-[0.5rem] rounded-md mt-8" id="navigateWrite">
              공유하러 가기
              </button>
              </ul>
            </nav>
            ${articleListComponent.template()}
            `;
  }
  setEvent() {
    this.addEvent('click', '#navigateWrite', () => {
      navigate('/write');
    });
  }
}
