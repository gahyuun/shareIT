import { Component } from '../../core/Component';
import imageLogo from '../../assets/imageLogo.svg';

export default class Write extends Component {
  template() {
    return `<section class="w-[47.625rem] mx-auto mt-[6rem]">
                <form id="writeForm" class="gap-10 flex flex-col" type="submit">
                    <label for="file" class="w-[18.75rem] h-[10.4375rem] flex items-center justify-center gap-3 
                    flex-col bg-contain bg-no-repeat bg-lightGray rounded-xl">
                        <img src="${imageLogo}" alt="이미지 로고">
                        <div class="w-[8.0625rem] h-[2.3125rem] bg-white rounded-md text-sm font-semibold flex 
                        items-center justify-center cursor-pointer">
                            썸네일 업로드
                            <input type="file" name="file" id="file" accept=".jpg, .png" class="hidden"/>
                        </div>
                    </label> 
                    <section class="gap-5 flex flex-col">
                        <input name="title" id="title" placeholder="제목을 입력해주세요" class="text-3xl font-medium
                         placeholder:text-darkGray text-primary"/>
                        <div class="w-[52px] h-[5px] bg-darkGray"></div>
                        <textarea name="content" id="content" placeholder="내용을 입력해주세요"
                         class="w-[47.625rem] min-h-[33rem] rounded-md border border-lightGray outline-none p-4"></textarea>
                    <section>
                </form>
            </section>`;
  }
}
