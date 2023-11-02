import { Component } from '../../core/Component';

export default class DetailSkeleton extends Component {
  template() {
    return `
    <div class="sm:block hidden">
    <main class="max-w-[46.875rem] mx-auto mt-[7rem] flex">
        <div class="animate-pulse bg-slate-100 w-[18.75rem] rounded-xl h-[10.4375rem] mr-[1rem]"></div>
        <div class="flex flex-col gap-4 w-[26rem] min-h-[10.4375rem]">
            <div class="animate-pulse bg-slate-100 w-[23rem] h-[3rem] rounded-xl"></div>
            <div class="w-[23rem] h-[1rem] animate-pulse bg-slate-100 rounded-xl"></div>
        </div>
    </main>
    <section class="max-w-[46.875rem] mx-auto mt-[3.3rem] min-h-[43rem] mb-5 outline-none 
    rounded-md animate-pulse bg-slate-100"></section></div>

    <div class="block sm:hidden">
    <main class="mx-auto mt-[3rem] flex flex-col items-center justify-center">
        <div class="animate-pulse bg-slate-100 w-[18.75rem] rounded-xl h-[10.4375rem] mr-[1rem]"></div>
        <div class="flex flex-col gap-4 w-[18.75rem] h-[7rem] mt-[2rem]">
            <div class="animate-pulse bg-slate-100 w-[18.75rem] h-[3rem] rounded-xl"></div>
            <div class="w-[18.75rem] h-[1rem] animate-pulse bg-slate-100 rounded-xl"></div>
        </div>
    </main>
    <section class="mx-auto min-h-[20rem] mb-5 outline-none 
    rounded-md animate-pulse bg-slate-100"></section>
    </div>`;
  }
}
