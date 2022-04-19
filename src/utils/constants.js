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
export const formAvatar = document.querySelector('.popup__form_avatar');

  //Buttons
export const editProfileBtn = document.querySelector('.profile__edit-button');
export const addMestoBtn = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__block-img');

//Inputs
//export const profileName = document.querySelector('.profile__title');
export const nameInput = formProfile.querySelector('.popup__input_type_name');
//export const profileDescription = document.querySelector('.profile__subtitle');
export const jobInput = formProfile.querySelector('.popup__input_type_work');
//export const imageName = document.querySelector('.popup__input_image_name');
//export const imageSrc = document.querySelector('.popup__input_image_src');

//Template
export const elements = document.querySelector('.elements');
export const popupData = {
  buttonClose: '.popup__btn_close',
  openedClass: '.popup_opened',
};

export const popupSelectors = {
  viewCard: '.popup_image',
  createCard: '.popup_mesto',
  editProfile: '.popup_profile',
  changeAvatar: '.popup_avatar',
  confirm: '.popup_confirm',
};

export const imageData = {
  imageSelector: '.figure__image',
  captionSelector: '.figure__caption',
};

//export const renderItems = '.profile__edit-button';
//export const btnNewCardSelector = '.profile__add-button';

export const formData = {
  form: config.formSelector,
  input: config.inputSelector,
};

export const cardTemplateSelector = '.element-template';

export const profileData = {
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
};


//Popup export const popups = document.querySelectorAll('.popup');


