import { Component } from '../../core/Component';

export default class Article extends Component {
  template() {
    const article = this.props;
    return `<section class="w-[18.75rem] h-[20rem] border border-lightGray border-solid rounded-xl pb-1">
                ${
                  article.imageUrl
                    ? `<img src="${article.imageUrl}" class="w-full h-[10.4375rem]  rounded-t-xl"/>`
                    : ''
                }
                <section class="mt-[0.7rem] h-[8.25rem] px-1.5 flex flex-col justify-between">
                    <div class="flex flex-col gap-2">
                      <div class="text-base font-semibold">
                      ${article.title}</div>
                      <div class="text-sm font-normal text-gray">
                      ${article.content} ...</div>
                    </div>
                    <div class="text-[0.6rem] font-light text-gray self-end">by 
                      ${article.userName}님
                    </div>
                </section>
            </section>`;
  }
}
