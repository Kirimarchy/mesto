const anchor = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const element = document.querySelector('.popup');
const mesto = document.querySelector('.popup_mesto');
const imageBig = document.querySelector('.popup_image');
const closeImage = document.querySelector('.popup__close-btn_image');
const form = document.querySelector('.popup__field');                 // Воспользуйтесь методом querySelector()
const closeMesto = document.querySelector('.popup__close-btn_mesto'); // Находим поля формы в DOM
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
const imagePopup = document.querySelector('.popup__image_opened');
const imageTitle = document.querySelector('.popup__title_opened');
const elementLike = document.querySelector('.element__like');
const elementDelete = document.querySelector('.element__delete');

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
  const initialCardsElement = elementTemplate.cloneNode(true);
  initialCardsElement.querySelector('.element__title').textContent = element.name;
  initialCardsElement.querySelector('.element__image').alt = element.name;
  initialCardsElement.querySelector('.element__image').src = element.link;
  initialCardsElement.querySelector('.element__like').addEventListener('click', function (evt) {
     evt.target.classList.toggle('element__like_active');
  });
  
 initialCardsElement.querySelector('.element__delete').addEventListener('click', e => {
e.currentTarget.closest('.element').remove()
return initialCardsElement;
});
  elementList.append(initialCardsElement);
    });

 addEventToImage();
 const initialCardsElement = elementTemplate.cloneNode(true);

function openPopup() {
  element.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
}

function openImage() {
  imageBig.classList.add('popup_opened');
}
 
function addEventToImage(){
  const imageOpen = (e) => {
    openImage(elementImage);
    imagePopup.src = e.target.src;
    imageTitle.textContent = e.target.alt; 
  }
 
  const cards = document.querySelectorAll('.element__image');
  cards.forEach(card => {
  card.addEventListener('click', imageOpen);
  }) 
 }

function openMesto(e) {
  e.preventDefault();
  mesto.classList.add('popup_opened');
  console.log(e.currentTarget);
}

function closePopup() {
  element.classList.remove('popup_opened');
  mesto.classList.remove('popup_opened');
  imageBig.classList.remove('popup_opened')
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();                       // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  profession.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
                                           // Выберите элементы, куда должны быть вставлены значения полей
  closePopup();
}

function formMestoSubmit(event) {
   event.preventDefault();

	if (event.type == 'click'){
		closePopup();
	}
	else if (event.type == 'submit'){
    const initialCardsElement = elementTemplate.cloneNode(true);
	  src = imageSrc.value;
	  titleName = imageName.value;
	  initialCardsElement.querySelector('.element__image').src = src;
    initialCardsElement.querySelector('.element__image').alt = titleName;
	  initialCardsElement.querySelector('.element__title').textContent = titleName;
	  initialCardsElement.querySelector('.element__like').addEventListener('click', function (evt) {
	  evt.target.classList.toggle('element__like_active');
    
	  });
  
	 initialCardsElement.querySelector('.element__delete').addEventListener('click', e => {
	 e.currentTarget.closest('.element').remove()
	return initialCardsElement;
	});
	  elementList.prepend(initialCardsElement);
	  closePopup();
	  imageSrc.value = "";
	  imageName.value = "";
    addEventToImage();
	}
}

anchor.addEventListener('click', openPopup);
addButton.addEventListener('click', openMesto);
closeBtn.addEventListener('click', formSubmitHandler);
closeMesto.addEventListener('click', formMestoSubmit);
form.addEventListener('submit', formSubmitHandler);
formMesto.addEventListener ('submit', formMestoSubmit);
closeImage.addEventListener ('click', closePopup);