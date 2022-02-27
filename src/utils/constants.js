export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'name' 
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'name'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'name'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'name'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'name'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'name'
    }
  ];

  //Validator
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-visible',
  }

  //Form
export const formProfile = document.querySelector('.popup__form_profile');
export const formMesto = document.querySelector('.popup__form_mesto');

  //Buttons
export const editProfileBtn = document.querySelector('.profile__edit-button');
export const addMestoBtn = document.querySelector('.profile__add-button');

//Inputs
export const profileName = document.querySelector('.profile__title');
export const nameInput = formProfile.querySelector('.popup__input_type_name');
export const profession = document.querySelector('.profile__subtitle');
export const jobInput = formProfile.querySelector('.popup__input_type_work');
export const imageName = document.querySelector('.popup__input_image_name');
export const imageSrc = document.querySelector('.popup__input_image_src');

//Template
export const elements = document.querySelector('.elements');

//Popup
export const popups = document.querySelectorAll('.popup');
export const profilePopup = document.querySelector('.popup_profile');
export const mestoPopup = document.querySelector('.popup_mesto');

