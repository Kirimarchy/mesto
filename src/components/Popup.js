//Создайте класс Popup, который отвечает за открытие и закрытие попапа.
export default class Popup {
   //Принимает в конструктор единственный параметр — селектор попапа
  constructor(popupSelector) {                           
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

//Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
 open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Содержит публичный метод setEventListeners, 
  //который добавляет слушатель клика иконке закрытия попапа. 
  //Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    const button = this._popup.querySelector('.popup__close-btn');
    button.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')) this.close();
    });
  }
  //Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose = function (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
}

