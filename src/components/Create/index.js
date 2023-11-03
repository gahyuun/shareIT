import { Component } from '../../core/Component';

export default class Create extends Component {
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
}
