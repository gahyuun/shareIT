import { Component } from '../../core/Component';
import imageLogo from '../../assets/imageLogo.svg';
import { uploadImage } from '../../apis/article';
import { v4 as uuidv4 } from 'uuid';
import { existFile } from '../../utils/validate';

export default class Write extends Component {
  template() {
    return `<section class="w-[47.625rem] mx-auto mt-[6rem]">
                <form id="writeForm" class="gap-10 flex flex-col" type="submit">
                <section class="w-[18.75rem] flex flex-col">
                <div class="self-end mr-[0.5rem] text-gray underline underline-offset-1 cursor-pointer hidden"
                 id="deleteImageButton">제거</div>
                    <label for="file" id="imageContainer" class="w-[18.75rem] h-[10.4375rem] flex items-center justify-center gap-3 
                    flex-col bg-cover bg-no-repeat bg-lightGray rounded-xl">
                    <img src="${imageLogo}" alt="이미지 로고" id="imageLogo">
                    <div class="w-[8.0625rem] h-[2.3125rem] bg-white rounded-md text-sm font-semibold flex 
                    items-center justify-center cursor-pointer" id="thumbnailButton">
                        썸네일 업로드
                    </div>
                    <input type="file" name="file" id="file" accept=".jpg, .png" class="hidden"/>
                    </label> 
                    </section>
                    <section class="gap-5 flex flex-col">
                        <input name="title" id="title" placeholder="제목을 입력해주세요" class="text-3xl font-medium
                         placeholder:text-darkGray text-primary" required/>
                        <div class="w-[52px] h-[5px] bg-darkGray"></div>
                        <textarea name="content" id="content" placeholder="내용을 입력해주세요"
                         class="w-[47.625rem] min-h-[33rem] rounded-md border border-lightGray outline-none p-4" required></textarea>
                         <button class="bg-blue text-white text-lg w-[8rem] h-[2.3125rem] px-[0.5rem] rounded-md self-end" 
                         id="writeButton">등록</button>
                    </section>
                </form>
            </section>`;
  }
  async r(file) {
    return await uploadImage(file, uuidv4());
  }
  handleReaderOnLoad(event) {
    const imageContainer = this.componentRoot.querySelector('#imageContainer');
    const imageLogo = this.componentRoot.querySelector('#imageLogo');
    const thumbnailButton =
      this.componentRoot.querySelector('#thumbnailButton');
    const deleteImageButton =
      this.componentRoot.querySelector('#deleteImageButton');
    imageContainer.style.backgroundImage = `url(${event.currentTarget.result})`;
    imageLogo.style.display = 'none';
    thumbnailButton.style.display = 'none';
    deleteImageButton.style.display = 'block';
  }
  previewImage(_, target) {
    const reader = new FileReader();
    console.log(this);
    reader.onload = this.handleReaderOnLoad.bind(this);
    reader.readAsDataURL(target.files[0]);
  }
  setEvent() {
    this.addEvent('submit', '#writeForm', async (event, target) => {
      event.preventDefault();
      const formData = new FormData(target);
      const file = formData.get('file');
      const title = formData.get('title');
      const content = formData.get('content');
    });
    this.addEvent('change', '#file', (_, target) => {
      this.previewImage(_, target);
    });
  }
}