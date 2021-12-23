const anchor = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const element = document.querySelector('.popup');
const mesto = document.querySelector('.popup_mesto');
const form = document.querySelector('.popup__field');                 
const closeMesto = document.querySelector('.popup__close-btn_mesto'); 
const closeBtn = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name'); 
const profession = document.querySelector('.profile__subtitle');
const jobInput = document.querySelector('.popup__input_type_work');
const formMesto = document.querySelector('.popup__field_mesto');
const imageName = document.querySelector('.popup__input_image_name');
const imageSrc = document.querySelector('.popup__input_image_src');
const elementTemplate = document.querySelector('.element__template').content;
const elementList = document.querySelector('.elements');
const elementText = document.querySelector('.element__text');
const elementTitle = document.querySelector('.element__title');
const elementImage = document.querySelector('.element__image');
const trashButton = document.querySelector('.element__delete');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (element) {
  const initialCardsElement = elementTemplate.cloneNode(true);
  initialCardsElement.querySelector('.element__image').src = element.link;
  initialCardsElement.querySelector('.element__image').alt = element.name;
  initialCardsElement.querySelector('.element__title').textContent = element.name;
  elementList.append(initialCardsElement);
  });

  const elementLike = document.querySelector('.element__like_active');
  for (let a = 0; a < elementLike.length; a++) {
    like[a].addEventListener('click', function (evt) {
      like[a].classList.toggle('element__like_active');
    });
  }

  function deleteElement(evt) {
    evt.preventDefault();
    e.currentTarget.closest('element').remove();
  }

function openPopup() {
  element.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
}
 
const initialCardsElement = elementTemplate.cloneNode(true);

function openMesto(e) {
  e.preventDefault();
  mesto.classList.add('popup_opened');
  console.log(e.currentTarget);
}

function closePopup() {
  element.classList.remove('popup_opened');
  mesto.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();                       

  profileName.textContent = nameInput.value; 
  profession.textContent = jobInput.value; 
  closePopup();
}

function addElement(event) {
   event.preventDefault();

	if (event.type == 'click'){
		closePopup();
	}
	else if (event.type == 'submit') {
	  src = imageSrc.value;
	  titleName = imageName.value;
	  initialCardsElement.querySelector('.element__image').src = src;
	  initialCardsElement.querySelector('.element__title').textContent = titleName;
	  elementList.prepend(initialCardsElement);
	  closePopup();
	}
}

anchor.addEventListener('click', openPopup);
addButton.addEventListener('click', openMesto);
closeBtn.addEventListener('click', formSubmitHandler);
closeMesto.addEventListener('click', addElement);
form.addEventListener('submit', formSubmitHandler);
trashButton.addEventListener('click', deleteElement);

