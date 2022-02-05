import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//Popup
const profilePopup = document.querySelector('.popup_profile');
const mestoPopup = document.querySelector('.popup_mesto');

//Form
const formProfile = document.querySelector('.popup__form_profile');
const formMesto = document.querySelector('.popup__form_mesto');

//Buttons
const esc = "Escape";
const editProfileBtn = document.querySelector('.profile__edit-button');
const addMestoBtn = document.querySelector('.profile__add-button');
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

//Ecapsulation
const formValidMesto = new FormValidator(config, formMesto);  
formValidMesto.enableValidation();
const formValidProfile = new FormValidator(config, formProfile);
formValidProfile.enableValidation();
 

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
  e.preventDefault();                    // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  profession.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
  closePopup(profilePopup);
}
//Closing by close and overlay
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-btn')) {
          closePopup(popup)
        }
    })
})

//Closing by Esc
function closeByEsc(evt) {
  if (evt.key === esc) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
//Редактирование профиля
editProfileBtn.addEventListener('click', () => { 
  openPopup(profilePopup);
  formValidProfile.disableSubmitButton(submitProfileBtn, config.inactiveButtonClass);
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  formValidProfile.resetValidation();
})

//Добавление карточки
function submitAddCardForm(e) {
  e.preventDefault();
  const newCard = generateCard ('.element-template', openPopup, 
  imageName.value, imageSrc.value);
  formMesto.reset();
  elements.prepend(newCard);
  formValidMesto.disableSubmitButton(submitBtn, config.inactiveButtonClass);
  closePopup(mestoPopup);
}

//Открытие/закрытие
addMestoBtn.addEventListener('click', () => {
  openPopup(mestoPopup);
 })

//Сабмиты
formMesto.addEventListener('submit', submitAddCardForm)
formProfile.addEventListener('submit', submitProfileForm);
 









