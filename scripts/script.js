import { initialCards } from '../array/cards.js';
const editFormModal = document.querySelector(".popup_profile");
const addFormModal = document.querySelector(".popup_mesto");
const imageFormModal = document.querySelector(".popup_image");
const editProfileBtn = document.querySelector('.profile__edit-button');
const addMestoBtn = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_profile');
const mestoPopup = document.querySelector('.popup_mesto');
const imageBig = document.querySelector('.popup_image');
const closeImageBtn = document.querySelector('.popup__close-btn_image');
const formProfile = document.querySelector('.popup__form_profile');      // Воспользуйтесь методом querySelector()
const closeMestoBtn = document.querySelector('.popup__close-btn_mesto'); // Находим поля формы в DOM
const closeProfile = document.querySelector('.popup__close-btn_profile');
const profileName = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const profession = document.querySelector('.profile__subtitle');
const jobInput = document.querySelector('.popup__input_type_work');
const formMesto = document.querySelector('.popup__form_mesto');
const imageName = document.querySelector('.popup__input_image_name');
const imageSrc = document.querySelector('.popup__input_image_src');
const elementTemplate = document.querySelector('.element-template').content;
const elementList = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup__image_opened');
const imageTitle = document.querySelector('.popup__title_opened');

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

editFormModal.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(editFormModal);
  }
});
addFormModal.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(addFormModal);
  }
});
imageFormModal.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModalWindow(imageFormModal);
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


const showInputError = (formElement, inputElement, { inputErrorClass }, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass)
}

const hideInputError = (formElement, inputElement, { inputErrorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`)
  errorElement.textContent = ''
  inputElement.classList.remove(inputErrorClass)
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, arr) => {
  const inputList = Array.from(formElement.querySelectorAll(arr.inputSelector));
  const buttonElement = formElement.querySelector(arr.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, arr);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, arr);
    });
  });
}; 


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(arr.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListeners(formElement, arr);
});


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

function toggleButtonState (inputList, buttonElement, arr){
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(arr.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(arr.inactiveButtonClass);
  }
};

enableValidation()
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input__error',
  errorClass: 'popup__error_visible',
})


