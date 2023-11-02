import { Component } from '../../core/Component';

export default class UserInfoSkeleton extends Component {
  template() {
    return `
    <article class="sm:max-w-[46.875rem] max-w-[21rem] h-[8.125rem] mx-auto mt-[8.4375rem] flex sm:gap-[4rem] gap-9">
    <div class="bg-slate-200 sm:w-[8.125rem] w-[6.5rem] sm:h-full h-[6.5rem] animate-pulse rounded-full"></div>
    <section class="flex flex-col sm:justify-between sm:py-[0.4rem] sm:gap-0 gap-5">
        <div class="w-[20rem] h-[2rem] animate-pulse bg-slate-200 rounded-2xl"></div>
        <div class=" animate-pulse bg-slate-200 rounded-3xl w-[7.875rem] h-[2rem]">
        </div>
    </section>
    </article>
        `;
  }
}
