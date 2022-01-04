const editProfileBtn = document.querySelector('.profile__edit-button');
const addMestoBtn = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_profile');
const mesto = document.querySelector('.popup_mesto');
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
const elementText = document.querySelector('.element__text');
const elementTitle = document.querySelector('.element__title');
const elementImage = document.querySelector('.element__image');
const imagePopup = document.querySelector('.popup__image_opened');
const imageTitle = document.querySelector('.popup__title_opened');

const initialCards = [
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

initialCards.forEach(function (element) {
  const initialCardsElement = createCard(element);
  elementList.append(initialCardsElement);
})

  function createCard(card) {
    const initialCardsElement = elementTemplate.cloneNode(true);
    initialCardsElement.querySelector('.element__title').textContent = card.name;
    initialCardsElement.querySelector('.element__image').alt = card.name;
    initialCardsElement.querySelector('.element__image').src = card.link;
    initialCardsElement.querySelector('.element__like').addEventListener('click', function (e) {
       e.target.classList.toggle('element__like_active');
    });
    initialCardsElement.querySelector('.element__delete').addEventListener('click', e => {
    e.currentTarget.closest('.element').remove()
    })
    return initialCardsElement;
}

  const imageOpen = (e) => {
  openPopup(imageBig);
  imagePopup.src = e.target.src;
  imageTitle.textContent = e.target.alt; 
}
  
const cards = document.querySelectorAll('.element__image');
cards.forEach(card => {
card.addEventListener('click', imageOpen);
}) 

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
  openPopup(mesto);
})

closeMestoBtn.addEventListener('click', (e) => {
  closePopup(mesto);
})

closeImageBtn.addEventListener('click', (e) => {
  closePopup(imageBig);
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitProfileForm(e) {
  e.preventDefault();                       // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  profession.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
                                           // Выберите элементы, куда должны быть вставлены значения полей
  closePopup();
}

formProfile.addEventListener('submit', submitProfileForm);


formMesto.addEventListener('submit', function(e) {
  e.preventDefault();
  const initialCardsElement = createCard(
    {name: imageName.value, 
    link: imageSrc.value}
    );
  elementList.prepend(initialCardsElement);
})