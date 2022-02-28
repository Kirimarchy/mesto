class Card { 
   //принимает в конструктор её данные и селектор её template-элемента;
   //содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;                                   
   //содержит приватные методы для каждого обработчика;
   // Card принимает в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.
  constructor(name, link, elementSelector, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._elementSelector = elementSelector;   
    this._handleCardClick = handleCardClick;  
    this._element = this._getTemplate();// Запишем разметку в поле _element   
    this._elementImage = this._element.querySelector('.element__image'); // картинка по селектору 
    }
   // Метод для выявления темплейта
    _getTemplate() { 
        return document
            .querySelector(this._elementSelector)    //Для каждой карточки создайте экземпляр класса Card
            .content.querySelector('.element')
            .cloneNode(true);   
    }
    createCard() {
      // Добавим данные
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
      this._setEventListeners(); // добавляем обработчик
      // Вернём элемент наружу
      return this._element;
    }


   //Метод добавляет все обработчики в одном месте
  _setEventListeners() {
  this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active')
  });

  this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
  });

  this._elementImage.addEventListener('click', () => {
    this._openPopupWithImage();
  })
}
_openPopupWithImage() {
    this._handleCardClick(this._name, this._link);
  }
}
  export { Card }
  
  