import Popup from './Popup.js';
//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }

  // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputVaiues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }
//Перезаписывает родительский метод setEventListeners.
// Метод setEventListeners класса PopupWithForm должен 
//не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputVaiues());// добавим вызов функции _handleSubmit
                                  // передадим ей объект — результат работы _getInputValues
    });
    super.setEventListeners();
  }
//Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  closePopup() {
    this._popupForm.reset();
    super.close();
  }
}