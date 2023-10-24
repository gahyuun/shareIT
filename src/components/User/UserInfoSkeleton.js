import { Component } from '../../core/Component';

export default class UserInfoSkeleton extends Component {
  template() {
    return `
    <article class="max-w-[46.875rem] h-[8.125rem] mx-auto mt-[8.4375rem] flex gap-[4rem]">
    <div class="bg-slate-200 h-full w-[8.125rem] animate-pulse rounded-full"></div>
    <section class="flex flex-col justify-between py-[0.4rem]">
        <div class="w-[20rem] h-[2rem] animate-pulse bg-slate-200 rounded-2xl"></div>
        <div class=" animate-pulse bg-slate-200 rounded-3xl w-[7.875rem] h-[2rem]">
        </div>
    </section>
    </article>
        `;
  }
}
