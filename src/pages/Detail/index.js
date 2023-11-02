import Swal from 'sweetalert2';
import { deleteArticle, getArticle } from '../../apis/article';
import { Component } from '../../core/Component';
import { getUrlParam, navigate } from '../../core/router';
import { articlesStore } from '../../store/article';
import { userStore } from '../../store/user';
import DetailSkeleton from './DetailSkeleton';
import { ROUTES } from '../../constants/routes';
import { dateFormat } from '../../utils/common';

export default class Detail extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    const id = getUrlParam();
    articlesStore.state.article = {};
    getArticle(id);
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
    <main class="max-w-[46.875rem] mx-auto sm:mt-[7rem] mt-[3rem] flex flex-col items-center justify-center sm:items-start sm:justify-normal sm:flex-row">
      ${
        article.imageUrl
          ? `<img src="${article.imageUrl}" alt="article-thumbnail" class="w-[18.75rem] rounded-xl h-[10.4375rem] sm:mr-[1.3rem]"/>`
          : ''
      }
        <section class="flex flex-col gap-4 sm:w-[26rem] w-[18.75rem] sm:pt-0 pt-3 min-h-[10.4375rem]">
            <div class="font-semibold sm:text-[2.5rem] text-2xl leading-10">${
              article.title
            }</div>
            <div class="text-base font-normal text-gray">by ${
              article.userName
            }님 | <span>${dateFormat(article.date.toDate())}</span></div>
            ${
              user.uid === article.uid
                ? `<div class="flex">
            <button class="mr-[0.5rem] flex items-center justify-center text-white bg-primary text-sm 
            font-medium rounded-md w-[5.1rem] h-[2.4rem]" id="edit-button">수정</button>
            <button class="flex items-center justify-center text-white bg-primary text-sm 
            font-medium rounded-md w-[5.1rem] h-[2.4rem]" id="delete-button">삭제</button>
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
  setEvent() {
    const article = articlesStore.state.article;
    this.addEvent('click', '#delete-button', async () => {
      const result = await Swal.fire({
        title: '정말 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      });
      if (result.isConfirmed) {
        await deleteArticle(article.id, article.imageUrl);
        navigate(ROUTES.HOME);
      }
    });

    this.addEvent('click', '#edit-button', async () => {
      navigate(`${ROUTES.EDIT}?id=${article.id}`);
    });
    this.indexKey = articlesStore.subscribe('article', () => {
      this.render();
    });
  }
  clearEvent() {
    this.eventListeners.map(({ eventType, eventListener }) => {
      this.componentRoot.removeEventListener(eventType, eventListener);
    });
    this.eventListeners = [];
    articlesStore.unSubscribe('article', this.indexKey);
  }
}
