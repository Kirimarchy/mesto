 //Создайте класс PopupWithImage, который наследует от Popup
import Popup from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(selector, classes, { imageSelector, captionSelector }) {
    super(selector, classes);
    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }
// Этот класс должен перезаписывать родительский метод open
//В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(title, link) {
    this._imageTitle.textContent = title;
    this._imageBig.src = link;
    this._imageBig.alt = title;
    super.open();
  }
}
