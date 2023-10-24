import { Component } from '../../core/Component';

export default class UserInfoSkeleton extends Component {
  template() {
    return `
    <div class="bg-slate-200 h-full w-[8.125rem] animate-pulse rounded-full"></div>
    <section class="flex flex-col justify-between py-[0.4rem]">
        <div class="w-[20rem] h-[2rem] animate-pulse bg-slate-200 rounded-2xl"></div>
        <div class=" animate-pulse bg-slate-200 rounded-3xl w-[7.875rem] h-[2rem]">
        </div>
    </section>
        `;
  }
}
