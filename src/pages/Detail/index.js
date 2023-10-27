import { getArticle } from '../../apis/article';
import { Component } from '../../core/Component';
import { getUrlParam } from '../../core/router';
import { articlesStore } from '../../store/article';
import { userStore } from '../../store/user';
import DetailSkeleton from './DetailSkeleton';

export default class Detail extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    const id = getUrlParam();
    articlesStore.state.article = {};
    getArticle(id);
    articlesStore.subscribe('article', () => {
      this.render();
    });
  }
  template() {
    const article = articlesStore.state.article;
    const user = userStore.state.user;
    if (article.id === undefined) {
      const detailSkeletonComponent = this.addChild(
        DetailSkeleton,
        this.componentRoot,
      );
      return detailSkeletonComponent.template();
    }
    return `
    <main class="max-w-[46.875rem] mx-auto mt-[7rem] flex">
      <img src="${
        article.imageUrl
      }" class="w-[18.75rem] rounded-xl h-[10.4375rem] mr-[1.3rem]"/>
        <section class="flex flex-col gap-4 max-w-[26rem] min-h-[10.4375rem]">
            <div class="font-semibold text-[2.5rem]">${article.title}</div>
            <div class="text-base font-normal text-gray">by ${
              article.userName
            }님</div>
            ${
              user.uid === article.uid
                ? `   <div class="flex">
            <button class="mr-[0.5rem] flex items-center justify-center text-white bg-primary text-sm 
            font-medium rounded-md w-[5.1rem] h-[2.4rem]">수정</button>
            <button class="flex items-center justify-center text-white bg-primary text-sm 
            font-medium rounded-md w-[5.1rem] h-[2.4rem]">삭제</button>
        </div>`
                : ''
            }
        </section>
    </main>
    <section class="max-w-[46.875rem] mx-auto mt-[3.3rem] min-h-[43rem] mb-5 
    rounded-md border border-lightGray outline-none p-7 text-base font-medium ">
    ${article.content}
    </section>`;
  }
}
