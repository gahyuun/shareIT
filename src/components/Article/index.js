import { ROUTES } from '../../constants/routes';
import { Component } from '../../core/Component';
import { navigate } from '../../core/router';

export default class Article extends Component {
  template() {
    const { article } = this.props;
    return `<section class="2xl:w-[18.75rem] lg:w-[16.5rem] md:w-[22rem] w-[16.75rem] lg:h-[20rem] border
     border-lightGray border-solid rounded-xl pb-1 cursor-pointer" id="article-${
       article.id
     }">
                ${
                  article.imageUrl
                    ? `<img src="${article.imageUrl}" alt="썸네일" loading="lazy" class="w-full h-[10.4375rem]  rounded-t-xl"/>`
                    : ''
                }
                <section class="mt-[0.7rem] h-[8.25rem] px-1.5 flex flex-col justify-between">
                    <div class="flex flex-col gap-2">
                      <div class="text-base font-semibold">
                      ${article.title}</div>
                      <div class="text-sm font-normal text-gray line-clamp-3">
                      ${article.content}</div>
                    </div>
                    <div class="text-[0.6rem] font-light text-gray self-end">by 
                      ${article.userName}님
                    </div>
                </section>
            </section>`;
  }
  setEvent() {
    const { article } = this.props;
    this.addEvent('click', `#article-${article.id}`, () => {
      navigate(`${ROUTES.DETAIL}/${article.id}`);
    });
  }
}
