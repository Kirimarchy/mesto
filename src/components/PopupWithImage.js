 //Создайте класс PopupWithImage, который наследует от Popup
import Popup from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popup.querySelector('.popup__title_opened');
    this._imageBig = this._popup.querySelector('.popup__image_opened');
  }
// Этот класс должен перезаписывать родительский метод open
//В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(title, link) {
    super.open();
    this._imageTitle.textContent = title;
    this._imageBig.src = link;
    this._imageBig.alt = title;
  }
}
