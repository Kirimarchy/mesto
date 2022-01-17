
import { config } from './config.js';

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
    inputElement.classList.add(inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass)
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся фунцкция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
        enableSubmitButton(buttonElement, inactiveButtonClass);
    }
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
    console.log(inactiveButtonClass)
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
};

const setEventListeners = (formElement,
    { inactiveButtonClass, inputErrorClass,
        inputSelector, submitButtonSelector, errorClass }) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);      
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};

enableValidation(config);
export { disableSubmitButton };