import { Component } from '../../core/Component';
import imageLogo from '../../assets/imageLogo.svg';
import { articlesStore } from '../../store/article';
import {
  deleteImage,
  getArticle,
  setArticleData,
  uploadImage,
} from '../../apis/article';
import { getUrlParam, navigate } from '../../core/router';
import { existFile } from '../../utils/validate';
import { v4 as uuidv4 } from 'uuid';
import { ROUTES } from '../../constants/routes';

export default class Edit extends Component {
  constructor(root = '', props = {}) {
    super(root, props);
    this.isDeleted = false;
    const id = getUrlParam();
    articlesStore.state.article = {};
    getArticle(id);
    articlesStore.subscribe('article', () => {
      this.render();
    });
  }
  template() {
    const article = articlesStore.state.article;
    if (article.id === undefined) return '';
    let hasImage = article.imageUrl !== null;
    return `<section class="w-[47.625rem] mx-auto mt-[6rem] mb-[2rem]">
                    <form id="editForm" class="gap-10 flex flex-col" type="submit">
                    <section class="w-[18.75rem] flex flex-col">
                    <div class="self-end mr-[0.5rem] text-gray underline underline-offset-1 cursor-pointer ${
                      hasImage ? 'block' : 'hidden'
                    }"
                     id="deleteImageButton">제거</div>
                        <label for="file" id="imageContainer" class="w-[18.75rem] h-[10.4375rem] flex items-center justify-center gap-3 
                        flex-col bg-cover bg-no-repeat bg-lightGray rounded-xl" style="background-image:url(${
                          article.imageUrl
                        })"}>
                        <img src="${imageLogo}" alt="이미지 로고" id="imageLogo" style="display:${
                          hasImage ? 'none' : 'block'
                        }">
                        <div class="w-[8.0625rem] h-[2.3125rem] bg-white rounded-md text-sm font-semibold flex 
                        items-center justify-center cursor-pointer" id="thumbnailButton"style="display:${
                          hasImage ? 'none' : 'flex'
                        }">
                            썸네일 업로드
                        </div>
                        <input type="file" name="file" id="file" accept=".jpg, .png" class="hidden" />
                        </label> 
                        </section>
                        <section class="gap-5 flex flex-col">
                            <input name="title" id="title" value="${
                              article.title
                            }" class="text-3xl font-medium text-primary" required/>
                            <div class="w-[52px] h-[5px] bg-darkGray"></div>
                            <textarea name="content" id="content" class="w-[47.625rem] min-h-[33rem] rounded-md border border-lightGray outline-none p-4" required>${
                              article.content
                            }</textarea>
                             <button class="bg-blue text-white text-lg w-[8rem] h-[2.3125rem] px-[0.5rem] rounded-md self-end" 
                             id="writeButton">수정</button>
                        </section>
                    </form>
                </section>`;
  }

  getImageElements() {
    const imageContainer = this.componentRoot.querySelector('#imageContainer');
    const imageLogo = this.componentRoot.querySelector('#imageLogo');
    const fileInput = this.componentRoot.querySelector('#file');
    const thumbnailButton =
      this.componentRoot.querySelector('#thumbnailButton');
    const deleteImageButton =
      this.componentRoot.querySelector('#deleteImageButton');
    return {
      imageContainer,
      imageLogo,
      fileInput,
      thumbnailButton,
      deleteImageButton,
    };
  }
  handleReaderOnLoad(event) {
    const {
      imageContainer,
      imageLogo,
      thumbnailButton,
      deleteImageButton,
      fileInput,
    } = this.getImageElements.bind(this)();
    imageContainer.style.backgroundImage = `url(${event.currentTarget.result})`;
    imageLogo.style.display = 'none';
    thumbnailButton.style.display = 'none';
    deleteImageButton.style.display = 'block';
  }
  previewImage(_, target) {
    const reader = new FileReader();
    reader.onload = this.handleReaderOnLoad.bind(this);
    reader.readAsDataURL(target.files[0]);
  }
  deletePreviewImage() {
    const {
      imageContainer,
      imageLogo,
      thumbnailButton,
      deleteImageButton,
      fileInput,
    } = this.getImageElements.bind(this)();
    this.isDeleted = true;
    fileInput.value = '';
    imageContainer.style.backgroundImage = '';
    imageLogo.style.display = 'block';
    thumbnailButton.style.display = 'flex';
    deleteImageButton.style.display = 'none';
  }
  async handleSubmit(event, target) {
    event.preventDefault();
    const formData = new FormData(target);
    const file = formData.get('file');
    console.log(file);
    const title = formData.get('title');
    const content = formData.get('content');
    let imageUrl = null;
    const data = { title, content, imageUrl };
    const article = articlesStore.state.article;

    // 1. 원래 이미지를 삭제하는 경우
    if (article.imageUrl && !existFile(file) && this.isDeleted) {
      deleteImage(article.imageUrl);
    }
    //2. 원래 이미지를 그대로 냅두는 경우
    else if (article.imageUrl && !this.isDeleted) {
      data.imageUrl = article.imageUrl;
    }
    //3 원래 이미지를 변경하는 경우
    else if (article.imageUrl && this.isDeleted && existFile(file)) {
      data.imageUrl = await uploadImage(file, uuidv4());
    }
    //4. 원래 없는 이미지를 추가하는 경우
    else if (existFile(file)) {
      data.imageUrl = await uploadImage(file, uuidv4());
    }

    await setArticleData(data, article.id);
    navigate(ROUTES.HOME);
  }
  setEvent() {
    this.addEvent('submit', '#editForm', this.handleSubmit.bind(this));
    this.addEvent('change', '#file', this.previewImage.bind(this));
    this.addEvent(
      'click',
      '#deleteImageButton',
      this.deletePreviewImage.bind(this),
    );
  }
}
