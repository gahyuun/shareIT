import { Component } from '../../core/Component';

export default class DetailSkeleton extends Component {
  template() {
    return `
    <main class="max-w-[46.875rem] mx-auto mt-[7rem] flex">
        <div class="animate-pulse bg-slate-100 w-[18.75rem] rounded-xl h-[10.4375rem] mr-[1rem]"></div>
        <div class="flex flex-col gap-4 w-[26rem] min-h-[10.4375rem]">
            <div class="animate-pulse bg-slate-100 w-[23rem] h-[3rem] rounded-xl"></div>
            <div class="w-[23rem] h-[1rem] animate-pulse bg-slate-100 rounded-xl"></div>
        </div>
    </main>
    <section class="max-w-[46.875rem] mx-auto mt-[3.3rem] min-h-[43rem] mb-5 outline-none 
    rounded-md animate-pulse bg-slate-100"></section>`;
  }
}
