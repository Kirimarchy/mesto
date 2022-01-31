import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//Popup
const profilePopup = document.querySelector('.popup_profile');
const mestoPopup = document.querySelector('.popup_mesto');
const imageBig = document.querySelector('.popup_image');

//Form
const formProfile = document.querySelector('.popup__form_profile');
const formMesto = document.querySelector('.popup__form_mesto');

//Buttons
const esc = "Escape";
const editProfileBtn = document.querySelector('.profile__edit-button');
const addMestoBtn = document.querySelector('.profile__add-button');
const closeImageBtn = document.querySelector('.popup__close-btn_image');
const closeMestoBtn = document.querySelector('.popup__close-btn_mesto');
const closeProfile = document.querySelector('.popup__close-btn_profile');
const submitBtn = mestoPopup.querySelector('.popup__button_submit');
const submitProfileBtn = document.querySelector('.popup__button_submit');

//Inputs
const profileName = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const profession = document.querySelector('.profile__subtitle');
const jobInput = document.querySelector('.popup__input_type_work');
const imageName = document.querySelector('.popup__input_image_name');
const imageSrc = document.querySelector('.popup__input_image_src');

//Template
const elements = document.querySelector('.elements');

//Validator
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-visible',
}

 //Карточки по дефолту
// Функция, которая вставляет данные в разметку и готовит карточки к публикации
function generateCard(template, popup, name, link) {
    const newCards = new Card(template, popup, name, link);
    return newCards.createCard(name, link)
}
// Обходим массив
initialCards.forEach((element) => {
    const initialCardsElement = generateCard('.element-template', openPopup, element.name, element.link);
    elements.append(initialCardsElement);//Добавляем карточку в конце массива
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitProfileForm(e) {
  e.preventDefault();                       // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  profession.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
  closePopup(profilePopup);
}

//Closing by Esc
function closeByEsc(evt) {
  if (evt.key === esc) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};
//Closing by overlay
function closeByOverlay(e) {
  const popupOpened = document.querySelector('.popup_opened');
  if (e.target === popupOpened) {
      closePopup(popupOpened)
  }
}

closeByOverlay(profilePopup);
closeByOverlay(mestoPopup);
closeByOverlay(imageBig);


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closeByEsc);
}

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  openPopup(profilePopup);
  const formDisabled = new FormValidator(config, config.formSelector);
  formProfile.reset();
  formDisabled.disableSubmitButton(submitProfileBtn, config.inactiveButtonClass);
})

function submitAddCardForm(e) {
  e.preventDefault();
  const newCard = generateCard ('.element-template', openPopup, 
  imageName.value, imageSrc.value);
  elements.prepend(newCard);
  const formDisabled = new FormValidator(config, config.formSelector);
  closePopup(mestoPopup);
  formMesto.reset();
  formDisabled.disableSubmitButton(submitBtn, config.inactiveButtonClass);
}

//Ecapsulation
const valid = new FormValidator(config, formMesto);  
valid.enableValidation(config, config.formSelector);
const formValidProfile = new FormValidator(config, formProfile)
formValidProfile.enableValidation(config, config.formSelector)

//Открытие/закрытие
closeProfile.addEventListener('click', () => {
  closePopup(profilePopup);
})

addMestoBtn.addEventListener('click', () => {
  openPopup(mestoPopup);
 
})

closeMestoBtn.addEventListener('click', () => {
  closePopup(mestoPopup);
})

closeImageBtn.addEventListener('click', () => {
  closePopup(imageBig);
})
//Сабмиты
formMesto.addEventListener('submit', submitAddCardForm)
formProfile.addEventListener('submit', submitProfileForm);
 









