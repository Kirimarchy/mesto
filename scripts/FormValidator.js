class FormValidator {  //принимает в конструктор объект настроек с селекторами и классами формы;
    constructor(config, formElement) {//принимает вторым параметром элемент той формы, которая валидируется;
        this._config = config;
        this._inputSelector = config.inputSelector;                                                
        this._formElement = formElement; 
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector); 
    }
    //имеет приватные методы, которые обрабатывают форму:
  //проверяют валидность поля, изменяют состояние кнопки сабмита, 
  //устанавливают все обработчики;

    _showInputError = (_formElement, inputElement, errorMessage) => {
        inputElement.classList.add(this._config.inputErrorClass);
        const errorElement = this._formElement.querySelector(`#${inputElement.id}Error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    };
    
    _hideInputError = (_formElement, inputElement) => {
        const errorElement =_formElement.querySelector(`#${inputElement.id}Error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };
    //проверяет на корректность введённых данных и вызывает hideInputError и showInputError.
   _checkInputValidity = (_formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            //Если в поле введены невалидные данные, вызовите
           this._showInputError(this._formElement, inputElement,inputElement.validationMessage);
        } else {
           // Если валидные данные вызовите
            this._hideInputError(this._formElement, inputElement);
        }
    };

    disableSubmitButton = (buttonElement, inactiveButtonClass) => {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    };

    enableSubmitButton = (buttonElement, inactiveButtonClass) => {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    };

    // Функция принимает массив полей
  _hasInvalidInput (inputList){
    // проходим по этому массиву методом some, Если поле не валидно, колбэк вернёт true
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    })
};
   //Переключатель кнопки сабмита
_toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
        this.disableSubmitButton(buttonElement, this._config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        this.enableSubmitButton(buttonElement, this._config.inactiveButtonClass);
    }
};

_setEventListeners = (_formElement) => {
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(_formElement, inputElement);
            this._toggleButtonState(this._inputList, this._buttonElement);      
        });
    });
};

resetValidation() {
    this._toggleButtonState(); 
    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement) 
    });
  };
  
 enableValidation() { // публичный метод enableValidation, который включает валидацию формы.
    this._setEventListeners();
    }
}

export default FormValidator
