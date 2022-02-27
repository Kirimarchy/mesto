import './pages/index.css';
import {
  initialCards,
  config,
  editProfileBtn,
  addMestoBtn,
  profileName,
  nameInput,
  profession,
  jobInput,
  formProfile,
  formMesto,
  elements
} from './utils/constants.js';
import Section from './components/Section.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';

// новый экземпляр класса imageForm
const imageForm = new PopupWithImage('.popup_image');
imageForm.setEventListeners();

//создание новой карточки
const generateCard = (item) => {
  const card = new Card(item.name, item.link, '.element-template', {
    handleCardClick: () => {
      imageForm.open(item.name, item.link);
    },
  });

  return card.createCard();
};

 //функция добавления новой секции
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (items) => {
      const cardElement = generateCard(items);
      defaultCardList.addItem(cardElement);
    },
  },
  elements
);
defaultCardList.renderItems();

//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({ profileName, profession });

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
//Добавление карточки
const AddMesto = new PopupWithForm({
  popupSelector: '.popup_mesto',
  handleSubmit: (item) => {
    defaultCardList.addItem(generateCard(item));
    AddMesto.close();
  },
});
AddMesto.setEventListeners();

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
//Редактирование профиля
const EditProfile = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleSubmit: (item) => {
    userInfo.setUserInfo(item.name, item.about);
    EditProfile.close();
  },
});
EditProfile.setEventListeners();

//Валидация
const formValidMesto = new FormValidator(config, formMesto);  
formValidMesto.enableValidation();
const formValidProfile = new FormValidator(config, formProfile);
formValidProfile.enableValidation();

 // открытие попапа редактирования профиля
 editProfileBtn.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.description;
  formValidProfile.resetValidation();
  EditProfile.open();
});

// открытие попапа добавления карточки
addMestoBtn.addEventListener('click', () => {
  formValidMesto.resetValidation();
  AddMesto.open();
  formValidMesto.toggleButtonState();
});











