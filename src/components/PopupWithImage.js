 //Создайте класс PopupWithImage, который наследует от Popup
import Popup from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
// Этот класс должен перезаписывать родительский метод open
//В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(title, link) {
    super.open();
    const imageTitle = this._popup.querySelector('.popup__title_opened');
    const imageBig = this._popup.querySelector('.popup__image_opened');
    imageTitle.textContent = title;
    imageBig.src = link;
    imageBig.alt = title;
  }
}
