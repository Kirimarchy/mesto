import { initialCards } from '../array/cards.js';

//Popup
const profilePopup = document.querySelector('.popup_profile');
const mestoPopup = document.querySelector('.popup_mesto');
const imageBig = document.querySelector('.popup_image');

//Buttons

const esc = "Escape";
const editProfileBtn = document.querySelector('.profile__edit-button');
const addMestoBtn = document.querySelector('.profile__add-button');
const closeImageBtn = document.querySelector('.popup__close-btn_image');
const closeMestoBtn = document.querySelector('.popup__close-btn_mesto'); 
const closeProfile = document.querySelector('.popup__close-btn_profile');

//Form

const formProfile = document.querySelector('.popup__form_profile');
const formMesto = document.querySelector('.popup__form_mesto');    

//Inputs
const profileName = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const profession = document.querySelector('.profile__subtitle');
const jobInput = document.querySelector('.popup__input_type_work');
const imageName = document.querySelector('.popup__input_image_name');
const imageSrc = document.querySelector('.popup__input_image_src');

//Template
const elementTemplate = document.querySelector('.element-template').content;
const elementList = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup__image_opened');
const imageTitle = document.querySelector('.popup__title_opened');

//закрытие по оверлей
const setEsclistener = function(evt) {
  if (evt.key === esc) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
  };
  
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEsclistener);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEsclistener);
}
profilePopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(profilePopup);
  }
});

mestoPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(mestoPopup);
  }
});
imageBig.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(imageBig);
  }
});

editProfileBtn.addEventListener('click', (e) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  openPopup(profilePopup);
})

closeProfile.addEventListener('click', (e) => {
  closePopup(profilePopup);
})

addMestoBtn.addEventListener('click', (e) => {
  openPopup(mestoPopup);
})

closeMestoBtn.addEventListener('click', (e) => {
  closePopup(mestoPopup);
})

closeImageBtn.addEventListener('click', (e) => {
  closePopup(imageBig);
})



initialCards.forEach(function (element) {
  const initialCardsElement = createCard(element);
  elementList.append(initialCardsElement);
})

function createCard(card) {

  const initialCardsElement = elementTemplate.cloneNode(true);
  const cardName = initialCardsElement.querySelector('.element__title');
  const cardAlt = initialCardsElement.querySelector('.element__image');
  const cardLink = initialCardsElement.querySelector('.element__image');

  cardName.textContent = card.name;
  cardAlt.alt = card.name;
  cardLink.src = card.link;

  cardLink.addEventListener('click', () => {
    imagePopup.src = cardLink.src;
    imageTitle.textContent = cardName.textContent;
    openPopup(imageBig);
  })


  initialCardsElement.querySelector('.element__like').addEventListener('click', function (e) {
    e.target.classList.toggle('element__like_active');
  });

  initialCardsElement.querySelector('.element__delete').addEventListener('click', e => {
    e.currentTarget.closest('.element').remove()
  })
  return initialCardsElement;
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitProfileForm(e) {
  e.preventDefault();                       // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  profession.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
  // Выберите элементы, куда должны быть вставлены значения полей
  closePopup(profilePopup);
}

formProfile.addEventListener('submit', submitProfileForm);

formMesto.addEventListener('submit', function (e) {
  e.preventDefault();
  const initialCardsElement = createCard(
    {
      name: imageName.value,
      link: imageSrc.value
    }
  );
  elementList.prepend(initialCardsElement);
  closePopup(mestoPopup);
  imageName.value = '';
  imageSrc.value = '';
})


const showInputError = (formElement, inputElement, errorMessage, config) => {
  inputElement.classList.add(config.inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass)
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass)
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

formElement.addEventListener("submit", function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля

function toggleButtonState (inputList, buttonElement, config){
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (config) => {
  const inputList = Array.from(document.querySelectorAll(config.inputSelector));
  const buttonElement = document.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}; 

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((config) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListeners(formElement, config);
});
};

enableValidation()

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
