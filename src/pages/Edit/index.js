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
    this.isImageDeleted = false;
    const id = getUrlParam();
    articlesStore.state.article = {};
    getArticle(id);
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
                     <div id="imageContainer" class="w-[18.75rem] h-[10.4375rem] flex items-center justify-center gap-3 
                     flex-col bg-cover bg-no-repeat bg-lightGray rounded-xl" style="background-image:url(${
                       article.imageUrl
                     })"}>
                        <label for="file" id="fileLabel" class="flex items-center justify-center gap-3 flex-col" style="display:${
                          hasImage ? 'none' : 'flex'
                        }">
                        <img src="${imageLogo}" alt="이미지 로고" id="imageLogo">
                        <div class="w-[8.0625rem] h-[2.3125rem] bg-white rounded-md text-sm font-semibold flex 
                        items-center justify-center cursor-pointer" id="thumbnailButton">
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
    const fileLabel = this.componentRoot.querySelector('#fileLabel');
    const deleteImageButton =
      this.componentRoot.querySelector('#deleteImageButton');
    const fileInput = this.componentRoot.querySelector('#file');
    return {
      imageContainer,
      fileLabel,
      deleteImageButton,
      fileInput,
    };
  }
  handleReaderOnLoad(event) {
    const { imageContainer, fileLabel, deleteImageButton } =
      this.getImageElements.bind(this)();
    imageContainer.style.backgroundImage = `url(${event.currentTarget.result})`;
    fileLabel.style.display = 'none';
    deleteImageButton.style.display = 'block';
  }
  previewImage(_, target) {
    const reader = new FileReader();
    reader.onload = this.handleReaderOnLoad.bind(this);
    reader.readAsDataURL(target.files[0]);
  }
  deletePreviewImage() {
    const { imageContainer, fileLabel, deleteImageButton, fileInput } =
      this.getImageElements.bind(this)();
    this.isImageDeleted = true;
    fileInput.value = '';
    imageContainer.style.backgroundImage = '';
    fileLabel.style.display = 'flex';
    deleteImageButton.style.display = 'none';
  }
  async handleImage(article, data, file) {
    if (article.imageUrl && this.isImageDeleted) {
      deleteImage(article.imageUrl);
      data.imageUrl = null;
    }
    if (existFile(file)) data.imageUrl = await uploadImage(file, uuidv4());
  }
  async handleSubmit(event, target) {
    event.preventDefault();
    const formData = new FormData(target);
    const file = formData.get('file');
    const title = formData.get('title');
    const content = formData.get('content');
    const article = articlesStore.state.article;
    const data = { title, content, imageUrl: article.imageUrl };

    await this.handleImage(article, data, file);
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
    this.indexKey = articlesStore.subscribe('article', () => {
      this.render();
    });
  }
  clearEvent() {
    this.eventListeners.map(({ eventType, eventListener }) => {
      this.componentRoot.removeEventListener(eventType, eventListener);
    });
    this.eventListeners = [];
    articlesStore.unSubscribe('article', this.indexKey);
  }
}
