let anchor = document.querySelector(".profile__edit-button");
let formElement = document.querySelector(".popup");
let closeBtn = document.querySelector(".popup__close-btn");
let cover = document.querySelector(".popup__cover");
let saveBtn = document.querySelector(".popup__submit");
let profileName = document.querySelector(".profile__title");
let nameInput = document.querySelector(".popup__name");
let profession = document.querySelector(".profile__subtitle");
let jobInput = document.querySelector(".popup__work");


function openPopup(evt) {
  evt.preventDefault();
formElement.classList.add("popup_opened");
}


function closePopup() {

formElement.classList.remove("popup_opened");
}



function formSubmitHandler (evt) {
   evt.preventDefault();
   
     profileName.textContent = nameInput.value;
     profession.textContent = jobInput.value;

     closePopup();

  } 
  
  nameInput.value = "Жак-Ив Кусто";
  jobInput.value = "Исследователь океана";

anchor.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);
cover.addEventListener("click", closePopup);
saveBtn.addEventListener("click", formSubmitHandler);







