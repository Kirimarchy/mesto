export class FormValidator {  //принимает в конструктор объект настроек с селекторами и классами формы;
    constructor(config, formElement) {//принимает вторым параметром элемент той формы, которая валидируется;
        this._formElement = formElement; 
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._errorClass = config.errorClass;                                                
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); 
    }
    //имеет приватные методы, которые обрабатывают форму:
  //проверяют валидность поля, изменяют состояние кнопки сабмита, 
  //устанавливают все обработчики;

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}Error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
        }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}Error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    // Функция принимает массив полей
  _hasInvalidInput() {
    // проходим по этому массиву методом some, Если поле не валидно, колбэк вернёт true
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
}
    //проверяет на корректность введённых данных и вызывает hideInputError и showInputError.
   _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            //Если в поле введены невалидные данные, вызовите
           this._showInputError(inputElement);
        } else {
           // Если валидные данные вызовите
            this._hideInputError(inputElement);
        }
    };

   //обработчик форм
    _setEventListeners() {
        this.toggleButtonState();  
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();      
            });
        });
    }
 // Деактивации кнопки сохранить (публичный, используется еще и в index.js)
    disableSubmitButton() {
        this._buttonElement = this._formElement.querySelector(
            this._submitButtonSelector
          );
          this._buttonElement.disabled = true;
          this._buttonElement.classList.add(this._inactiveButtonClass);
        }
 // активация кнопки сохранить при успешном прохождении валидации
    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    };


   //Переключатель кнопки сабмита
toggleButtonState() {
    if (this._hasInvalidInput()) {
        this.disableSubmitButton();
    } else {
        this._enableSubmitButton();
    }
}

enableValidation() { // публичный метод enableValidation, который включает валидацию формы.
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    this._setEventListeners();
    }

  // метод для очистки ошибок и управления кнопкой
resetValidation() {
    this.toggleButtonState(); 
    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement) 
    });
  }
}