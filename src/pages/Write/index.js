import imageLogo from '../../assets/imageLogo.svg';
import { uploadArticleData, uploadImage } from '../../apis/article';
import { v4 as uuidv4 } from 'uuid';
import { existFile } from '../../utils/validate';
import { navigate } from '../../core/router';
import { ROUTES } from '../../constants/routes';
import Create from '../../components/Create';
import Swal from 'sweetalert2';

export default class Write extends Create {
  template() {
    return `<section class="sm:w-[47.625rem] w-[21rem] mx-auto mt-[6rem] mb-[2rem]">
                <form id="writeForm" class="gap-10 flex flex-col" type="submit">
                <section class="w-[18.75rem] flex flex-col">
                <div class="self-end mr-[0.5rem] text-gray underline underline-offset-1 cursor-pointer hidden"
                 id="deleteImageButton">제거</div>
                 <div id="imageContainer" class="w-[18.75rem] h-[10.4375rem] flex items-center justify-center gap-3 
                 flex-col bg-cover bg-no-repeat bg-lightGray rounded-xl">
                    <label for="file" id="fileLabel" class="flex items-center justify-center gap-3 
                    flex-col  bg-lightGray rounded-xl">
                    <img src="${imageLogo}" alt="이미지 로고" id="imageLogo">
                    <div class="w-[8.0625rem] h-[2.3125rem] bg-white rounded-md text-sm font-semibold flex 
                    items-center justify-center cursor-pointer" id="thumbnailButton">
                        썸네일 업로드
                    </div>
                    <input type="file" name="file" id="file" accept=".jpg, .png" class="hidden"/>
                    </label> 
                    </section>
                    <section class="gap-5 flex flex-col">
                        <input name="title" id="title" placeholder="제목을 입력해주세요" class="sm:text-3xl text-2xl font-medium
                         placeholder:text-darkGray text-primary" required/>
                        <div class="w-[3.25rem] h-[0.3125rem] bg-darkGray"></div>
                        <textarea name="content" id="content" placeholder="내용을 입력해주세요"
                         class="sm:w-[47.625rem] w-[21rem] min-h-[33rem] rounded-md border border-lightGray outline-none p-4" required></textarea>
                         <button class="bg-blue text-white text-lg w-[8rem] h-[2.3125rem] px-[0.5rem] rounded-md self-end" 
                         id="writeButton">등록</button>
                    </section>
                </form>
            </section>`;
  }

  deletePreviewImage() {
    const { imageContainer, fileLabel, deleteImageButton, fileInput } =
      this.getImageElements.bind(this)();
    fileInput.value = '';
    imageContainer.style.backgroundImage = '';
    fileLabel.style.display = 'flex';
    deleteImageButton.style.display = 'none';
  }
  async handleImage(file, data) {
    if (existFile(file)) {
      data.imageUrl = await uploadImage(file, uuidv4());
    }
  }
  async handleSubmit(event, target) {
    event.preventDefault();
    const formData = new FormData(target);
    const file = formData.get('file');
    const title = formData.get('title');
    const content = formData.get('content');
    let imageUrl = null;
    const data = { title, content, imageUrl };

    await this.handleImage(file, data);
    try {
      await uploadArticleData(data);
      navigate(ROUTES.HOME);
    } catch (error) {
      Swal.fire('알 수 없는 오류입니다');
    }
  }
  setEvent() {
    this.addEvent('submit', '#writeForm', this.handleSubmit.bind(this));
    this.addEvent('change', '#file', this.previewImage.bind(this));
    this.addEvent(
      'click',
      '#deleteImageButton',
      this.deletePreviewImage.bind(this),
    );
  }
}
