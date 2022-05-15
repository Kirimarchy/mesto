class Card {
    //принимает в конструктор её данные и селектор её template-элемента;
    //содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
    //содержит приватные методы для каждого обработчика;
    // Card принимает в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.
    //Чтобы выбирать из нескольких шаблонов, сделаем селектор частью конструктора класса
    constructor(data, userId, elementSelector, {handleCardClick, handleDeleteCardClick, handleLikeClick}) {
        this._name = data.name;// название карточки
        this._link = data.link; // ссылка на изображение
        this._alt = data.name; // альт карточки
        this._likes = data.likes;// лайки карточек, если их нет при загрузке применять правую часть, пустой массив
        this._cardId = data._id;// id карточки
        this._ownerId = data.owner?._id; // id владельца юзера добавившего эту карточку
        this._userId = userId;  // текущий пользватель
        this._elementSelector = elementSelector; // // записали селектор в приватное поле
        this._handleCardClick = handleCardClick; // открыть карточку, попап
        this._handleDeleteCardClick = handleDeleteCardClick;  // удаление карточки
        this._handleLikeClick = handleLikeClick; // лайк карточки
        this._element = this._getTemplate();// Запишем разметку в поле _element
        this._elementImage = this._element.querySelector('.element__image'); // картинка по селектору
        this._likeButton = this._element.querySelector('.element__button_clicked'); //кнопка лайка по селектору
        this._deleteButton = this._element.querySelector('.element__button_action_del'); //кнопка корзины по селектору
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._currentUserId = userId;
    }

    // здесь выполним все необходимые операции, чтобы вернуть разметку
    //получаем готовую разметку перед размещением на страницу. Так мы отделим логику обработки разметки от логики публикации элемента.
    //задача метода — вернуть разметку карточки через return
    _getTemplate() { 
          // вернём DOM-элемент карточки
        return document
            .querySelector(this._elementSelector)//найдёт template-элемент 
            .content.querySelector('.element')//в содержимом найдёт элемент с классом
            .cloneNode(true);// забираем разметку из HTML и клонируем элемент
           
    }

    /* объявляем функцию createCard,
    подготовит карточку к публикации. */
    createCard() {
        // Добавим данные
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners(); //метод создаст карточки уже с обработчиком.
        this._handleCardDeleteVisible(); // кнопка удаления
        this.updateLikes()// количество лайков
        // Вернём элемент наружу

        return this._element;
    }

    //Метод добавляет все обработчики в одном месте
    //Колбэк слушателя событий — стрелочная функция.
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
        this._elementImage.addEventListener('click', () => {
            this._openPopupWithImage();
        });
    }

    // проверяем есть ли лайки
    ifLiked() {
        return !!this._likes.length;
    }

    // проверяем есть ли лайк юзера
    ifLikedByUser() {
        return this._likes?.some((Like) => Like._id === this._currentUserId);
    }

    // обновляем лайки карточек
    updateLikes() {
        if (!this._likes) {
            this._likeButton.remove();
        }

        this._likeCounter.textContent = this._likes?.length || '';
        // проверяем есть ли лайк пользователя
        if (this.ifLikedByUser()) {
            this._likeButton.classList.add('is_user_like');
        } else {
            this._likeButton.classList.remove('is_user_like');
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

    // проверям моя ли карточка и есть ли владелец. Если нет, то убираем кнопку удаления
    _handleCardDeleteVisible() {
        if (this._ownerId !== this._currentUserId || !this._ownerId) {
            this._deleteButton.remove();
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

    renderCard() {
        return this.createCard();
    }
}

export {Card};
  
  