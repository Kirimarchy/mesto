import { initialCards } from './cards.js';
import { config } from './config.js';
import { disableSubmitButton } from './validate.js';

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
const submitBtn = document.querySelector('.popup__button_submit');

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

//Closing by Esc
const setEsclistener = function (evt) {
  if (evt.key === esc) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//Closing by overlay
function closeByOverlay(popup) {
  popup.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__btn_close")
    ) {
      closePopup(popup);
    }
  });
}

closeByOverlay(profilePopup);
closeByOverlay(mestoPopup);
closeByOverlay(imageBig);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEsclistener);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEsclistener);
}

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  openPopup(profilePopup);
})


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

formMesto.addEventListener('submit', submitAddCardForm);
formProfile.addEventListener('submit', submitProfileForm);
 

initialCards.forEach(function (element) {
  const initialCardsElement = createCard(element);
  elementList.append(initialCardsElement);
})

// like card
function likeCard(e) {
  e.target.classList.toggle('element__like_active');
}
// delete card
function deleteCard(e) {
  e.currentTarget.closest('.element').remove()
}

function createCard(card) {

  const initialCardsElement = elementTemplate.cloneNode(true);
  const cardName = initialCardsElement.querySelector('.element__title');
  const cardImage = initialCardsElement.querySelector('.element__image');
  initialCardsElement.querySelector('.element__like').addEventListener('click', likeCard);
  initialCardsElement.querySelector('.element__delete').addEventListener('click',deleteCard);
  cardName.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardImage.addEventListener('click', () => {
    imagePopup.src = card.link;
    imageTitle.textContent = card.name;
    openPopup(imageBig);
  })
  return initialCardsElement;
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitProfileForm(e) {
  e.preventDefault();                       // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  profession.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
  closePopup(profilePopup);
}

function submitAddCardForm(e) {
  e.preventDefault();
  const initialCardsElement = createCard (
    {
      name: imageName.value,
      link: imageSrc.value
    }
  );
  elementList.prepend(initialCardsElement);
  closePopup(mestoPopup);
  disableSubmitButton(submitBtn, config.inactiveButtonClass);
}







