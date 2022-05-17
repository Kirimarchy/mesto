import Popup from './Popup.js';
//наследуется от класса Popup
//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
export class PopupWithForm extends Popup {
    constructor({popupSelector, handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._button = this._popupForm.querySelector('.popup__button_submit');
    }
/*//метод, который будет вставлять данные в инпуты:
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }*/
    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputVaiues() {
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues; 
    }
    

//Перезаписывает родительский метод setEventListeners.
// Метод setEventListeners класса PopupWithForm должен 
//не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmit(this._getInputVaiues());// добавим вызов функции _handleSubmit
                      // передадим ей объект — результат работы _getInputValues
        });
    }

    // метод загрузки  'Сохранение...'
    isLoading(isLoading, buttonText='Сохранить') {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else if (this._popupSelector === '.popup') {
      this._popupSave = "Создать";
    } else {
      this._button.textContent = buttonText;
    }
   }

   close() {
    this._popupForm.reset();
    super.close();
   }
}