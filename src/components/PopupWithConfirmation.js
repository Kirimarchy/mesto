import Popup from './Popup.js';
// наследуется от класса Popup
//вызывать функцию при сабмите. 
//Соответственно никаких других методов у этого попапа не будет, так как нет формы которую надо валидировать.
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__button_submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._handleSubmitCalllback();
    });
  }

  setSubmitCallback(callback) {
    this._handleSubmitCalllback = callback;
  }
}