import './index.css';
import {
    initialCards,
    config,
    editProfileBtn,
    addMestoBtn,
    avatarEditButton,
    nameInput,
    jobInput,
    formProfile,
    formMesto,
    formAvatar,
    popupData,
    popupSelectors,
    imageData,
    profileData,
    elements
} from '../utils/constants.js';
import Section from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Api} from '../components/Api.js';


// новый экземпляр класса imageForm
const imageForm = new PopupWithImage(
    popupSelectors.viewCard,
    popupData,
    imageData
);
imageForm.setEventListeners();


//создание новой карточки
const generateCard = (item) => {
    const card = new Card(item, userId, '.element-template', {
        handleCardClick: () => {
            // Создаем объект с методом открытия и событиями
            imageForm.open(item.name, item.link);// Передаем метод открытия popup
        },
        // удаление карточки, открытие попапа, появление кнопки удаления если карточка моя
        handleDeleteCardClick: (card) => {
            popupDeleteCard.open();
            popupDeleteCard.setSubmitCallback(() => {
                api
                    .deleteCard(card.cardId())
                    .then(() => {
                        card.deleteCard();
                        popupDeleteCard.close();
                    })
                    .catch((err) => {
                        console.log(`Ошибка при удалении карточки: ${err}`);
                    });
            });
        },
        // лайк карточки
        handleLikeClick: (card) => {
            if (card.ifLikedByUser()) {
                // проверям если ли лайк есть, то удаляем
                api
                    .unlikeCard(card.cardId())
                    .then((item) => {
                        card.sentLikesInfo(item.likes);
                    })
                    .catch((err) => {
                        console.log(`Ошибка удаления лайка: ${err}`);
                    });
            } else {
                // иначе ставим лайк
                api
                    .likeCard(card.cardId())
                    .then((data) => {
                        card.sentLikesInfo(data.likes);
                    })
                    .catch((err) => {
                        console.log(`Ошибка лайка: ${err}`);
                    });
            }
        },
    });
    return card.renderCard();
};


//функция добавления новой секции
const defaultCardList = new Section(
    {
        items: initialCards,
        renderer: generateCard,
    },
    elements
);

// попап удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_confirm');
popupDeleteCard.setEventListeners();

//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo(profileData);

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort36',
    headers: {
        authorization: '55b469c4-8b27-481f-8422-268744bde49b',
        "Content-Type": "application/json",
    }
})

//переменная текущего пользователя
let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([userData, profile]) => {
        userId = profile._id;
        userData.forEach((item) => {
            defaultCardList.addItem(item) // Рендерим  карточки пользователей
        });
        userInfo.setUserInfo(profile); // грузим данные пользователя
        //userInfo.setUserAvatar(profile);
    })
    .catch((err) => {
        // выводим карточки по умолчанию
        defaultCardList.renderItems();

        console.log(`Error: ${err}`);
    });

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
//Добавление карточки
const addMesto = new PopupWithForm({
    popupSelector: '.popup_mesto',
    handleSubmit: (data) => {
        addMesto.isLoading(true);
        const item = {name: data.name, link: data.link};
        api
            .postNewCard(item)
            .then((result) => {
                defaultCardList.prependItem(result); // добавляем в начало - метод prependItem в Section.js
                addMesto.close();
            })
            .catch((err) => {
                console.log(`Ошибка добавления карточки: ${err}`);
            })
            .finally(() => {
                addMesto.isLoading(false);
            });
    },
});
addMesto.setEventListeners();

//Редактирование профиля
const editProfile = new PopupWithForm({
    popupSelector: '.popup_profile',
    handleSubmit: (item) => {
        editProfile.isLoading(true);
        api
            .patchUserProfile(item)
            .then((result) => {
                userInfo.setUserInfo(result); // метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
                editProfile.close();
            })
            .catch((err) => {
                console.log(`Ошибка профиля пользователя: ${err}`);
            })
            .finally(() => {
                editProfile.isLoading(false);
            });
    },
});
editProfile.setEventListeners();

//Редактирование аватара
const editAvatar = new PopupWithForm({
    popupSelector: '.popup_avatar',
    handleSubmit: (item) => {
        editAvatar.isLoading(true);
        api
            .patchNewAvatar(item)
            .then((result) => {
                userInfo.setUserInfo(result);
                editAvatar.close();
            })
            .catch((err) => {
                console.log(`Ошибка при изменении аватара пользователя: ${err}`);
            })
            .finally(() => {
                editAvatar.isLoading(false);
            });
    },
});
editAvatar.setEventListeners();


//Валидация
const formValidMesto = new FormValidator(config, formMesto);
formValidMesto.enableValidation();
const formValidProfile = new FormValidator(config, formProfile);
formValidProfile.enableValidation();
const formValidAvatar = new FormValidator(config, formAvatar);
formValidAvatar.enableValidation();



/*const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(config);

formValidators[ profileForm.getAttribute('name') ].resetValidation()

// или можно использовать строку (ведь Вы знаете, какой атрибут `name` у каждой формы)
formValidators['profile-form'].resetValidation()
*/ 
// открытие попапа редактирования профиля
editProfileBtn.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    jobInput.value = data.description;
    formValidProfile.disableSubmitButton();
    editProfile.open();
});

// открытие попапа добавления карточки
addMestoBtn.addEventListener('click', () => {
    formValidMesto.resetValidation();
    addMesto.open();
    formValidMesto.toggleButtonState();
});

// кнопка сменить аватар
avatarEditButton.addEventListener('click', () => {
    editAvatar.open();
    formValidAvatar.toggleButtonState();
});










