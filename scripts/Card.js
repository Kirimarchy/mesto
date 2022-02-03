class Card {  //принимает в конструктор её данные и селектор её template-элемента;
  constructor(selector, openPopup, name, imageLink) {
    this._name = name;
    this._imageLink = imageLink;
    this._openPopup = openPopup;
    this._selector = selector;        //содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
                                      //содержит приватные методы для каждого обработчика;
    }

    _getTemplate() {                         // Метод для выявления темплейта
        return document
            .querySelector(this._selector)    //Для каждой карточки создайте экземпляр класса Card.
            .content
            .querySelector('.element')
            .cloneNode(true);   
    }

   _openCard(title, link) {
      const imagePopup = document.querySelector('.popup_image');
      const imageTitle = document.querySelector('.popup__title_opened');
      const imageBig = document.querySelector('.popup__image_opened');
      this._openPopup(imagePopup);
      imageTitle.textContent = title;
      imageBig.src = link;
      imageBig.alt = title;
  }
//Метод добавляет все обработчики в одном месте
  _setEventListeners(_name, _imageLink) {
      this._element.querySelector('.element__like').addEventListener('click', (evt) => {
          evt.target.classList.toggle('element__like_active')
      });

      this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
          evt.target.closest('.element').remove();
      });

      this._elementImage.addEventListener('click', () => {
          this._openCard(_name, _imageLink)
      })
  }

  createCard(_name, _imageLink) {//метод создает карточки
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._setEventListeners(_name, _imageLink);// метод создает карточки уже с обработчиком.
      this._element.querySelector('.element__title').textContent = _name;
      this._elementImage.src = _imageLink;
      this._elementImage.alt = _name;
      return this._element
  }

}


  export default Card
  
  