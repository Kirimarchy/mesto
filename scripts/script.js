import { initialCards } from '../array/cards.js';
const editProfileBtn = document.querySelector('.profile__edit-button');
const addMestoBtn = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_profile');
const mestoPopup = document.querySelector('.popup_mesto');
const imageBig = document.querySelector('.popup_image');
const closeImageBtn = document.querySelector('.popup__close-btn_image');
const formProfile = document.querySelector('.popup__field_profile');      // Воспользуйтесь методом querySelector()
const closeMestoBtn = document.querySelector('.popup__close-btn_mesto'); // Находим поля формы в DOM
const closeProfile = document.querySelector('.popup__close-btn_profile');
const profileName = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const profession = document.querySelector('.profile__subtitle');
const jobInput = document.querySelector('.popup__input_type_work');
const formMesto = document.querySelector('.popup__field_mesto');
const imageName = document.querySelector('.popup__input_image_name');
const imageSrc = document.querySelector('.popup__input_image_src');
const elementTemplate = document.querySelector('.element-template').content;
const elementList = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup__image_opened');
const imageTitle = document.querySelector('.popup__title_opened');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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
})