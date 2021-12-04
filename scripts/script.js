let anchor = document.querySelector('.profile__edit-button');
let element = document.querySelector('.popup');
let form = document.querySelector('.popup__field'); // Воспользуйтесь методом querySelector()
let closeBtn = document.querySelector('.popup__close-btn');
let saveBtn = document.querySelector('.popup__submit');
let profileName = document.querySelector('.profile__title');
let nameInput = document.querySelector('.popup__input-name');// Находим поля формы в DOM
let profession = document.querySelector('.profile__subtitle');
let jobInput = document.querySelector('.popup__input-work');


function openPopup() {
element.classList.add('popup_opened');
nameInput.value = profileName.textContent;
jobInput.value = profession.textContent;
console.log(element);
console.log(nameInput);
console.log(jobInput);
console.log(profileName);
console.log(profession);
}


function closePopup() {
element.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет   
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
  profession.textContent = jobInput.value;// Вставьте новые значения с помощью textContent                                       
                                          // Выберите элементы, куда должны быть вставлены значения полей
  closePopup();
  } 
  

anchor.addEventListener('click', openPopup);
closeBtn.addEventListener('click', formSubmitHandler);
form.addEventListener('submit', formSubmitHandler); 













