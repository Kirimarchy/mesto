class Card { 
   //принимает в конструктор её данные и селектор её template-элемента;
   //содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;                                   
   //содержит приватные методы для каждого обработчика;
   // Card принимает в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.
  constructor(data, userId, elementSelector, { handleCardClick, handleDeleteCardClick, handleLikeClick }) {
    this._name = data.name;// название карточки
    this._link = data.link; // ссылка на изображение
    this._alt = data.name; // альт карточки
    this._likes = data.likes;// лайки карточек, если их нет при загрузке применять правую часть, пустой массив
    this._cardId = data._id;// id карточки
    this._ownerId = data.owner._id; // id владельца юзера добавившего эту карточку
    this._userId = userId;  // текущий пользватель
    this._elementSelector = elementSelector; // селектор карточки
    this._handleCardClick = handleCardClick; // открыть карточку, попап
    this._handleDeleteCardClick = handleDeleteCardClick;  // удаление карточки
    this._handleLikeClick = handleLikeClick; // лайк карточки
    this._element = this._getTemplate();// Запишем разметку в поле _element   
    this._elementImage = this._element.querySelector('.element__image'); // картинка по селектору 
    this._likeButton = this._element.querySelector('.element__button_clicked'); //кнопка лайка по селектору
    this._deleteButton = this._element.querySelector('.element__button_action_del'); //кнопка корзины по селектору
    this._likeCounter = this._element.querySelector('.element__like-counter');

    }
   // Метод для выявления темплейта
    _getTemplate() { 
        return document
            .querySelector(this._elementSelector)    //Для каждой карточки создайте экземпляр класса Card
            .content.querySelector('.element')
            .cloneNode(true);   
    }
    /* объявляем функцию createCard,
    она будет возвращать новые объекты карточек */
    createCard() {
      // Добавим данные
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
      this._setEventListeners(); // добавляем обработчик
      this._handleCardDeleteVisible(); // кнопка удаления
      this._updateLikes()// количество лайков
      // Вернём элемент наружу
      return this._element;
    }


   //Метод добавляет все обработчики в одном месте
  _setEventListeners() {
  // Удаление карточки
  this._deleteButton.addEventListener('click', () => {
    this._handleDeleteCardClick(this);
  });

   // Лайк карточки
   this._likeButton.addEventListener('click', () => {
    this._handleLikeClick(this);
  });

  // Открытие попапа карточки
  this._cardImage.addEventListener('click', () => {
    this._openPopupWithImage();
  });
}

// проверяем есть ли лайки
ifLiked() {
  return this._likes.some((Like) => Like._id === this._currentUserId);
}

 // обновляем лайки карточек
updateLikes() {
this._likeCounter.textContent = this._likes.length;
if(this.ifLiked()) {
this._likeButton.classList.add('element__like_active');
} else {
  this._likeButton.classList.remove('element__like_active');
}
}

 // метод установки лайков
sentLikesInfo(likes) {
  this._likes = likes;
  this.updateLikes();
}
  // открытие попапа с карточкой
_openPopupWithImage() {
    this._handleCardClick(this._name, this._link);
  }

   // проверям моя ли карточка и если да то показываем кнопку удаления
   _handleCardDeleteVisible() {
    if (this._ownerId === this._currentUserId) {
      this._deleteButton.classList.add("card__btn_visible_del");
    } else {
      this._deleteButton.classList.remove("card__btn_visible_del");
    }
  }

  // метод удаления карточки
  deleteCard() {
    this._element.remove(); // удаляем элемент из DOM
    this._element = null;
  }

  // id карточки
  cardId() {
    return this._cardId;
  }
}

  export { Card };
  
  