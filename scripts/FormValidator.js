export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputList = form.querySelectorAll(this._inputSelector);
  };

  // Функция, которая добавляет обработчик событий всем формам
  enableValidation () {
    this._setEventListeners();
  };

  // Функция, которая добавляет обработчик событий всем полям ввода
  _setEventListeners () {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  // Функция, которая проверяет валидность поля
  _checkInputValidity (input) {
    const inputErrorMessage = this._form.querySelector(`#${input.id}-input-error`);
    if (!input.validity.valid) {
      this._showInputError(inputErrorMessage, input);
    } else {
      this._hideInputError(inputErrorMessage, input);
    }
  };

  // Функция, которая добавляет класс с ошибкой
  _showInputError (inputErrorMessage, input) {
    input.classList.add(this._inputErrorClass);
    inputErrorMessage.textContent = input.validationMessage;
    inputErrorMessage.classList.add(this._errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError (inputErrorMessage, input) {
    input.classList.remove(this._inputErrorClass);
    inputErrorMessage.textContent = '';
    inputErrorMessage.classList.remove(this._errorClass);
  }

  // Функция, которая переключает класс с ошибкой для кнопки
  _toggleButtonState() {
    if (this._hasInValidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  // Функция, которая проверяет наличие полей с неправильным вводом
  _hasInValidInput () {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  };

  // Функция, которая делает кнопку активной
  _enableButton () {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute("disabled");
  };

  // Функция, которая делает кнопку неактивной
  _disableButton () {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute("disabled", true);
  };

  //Сброс ошибок при открытии попапов
  resetErrors() {
    this._inputList.forEach((input) => {
      const inputErrorMessage = this._form.querySelector(`#${input.id}-input-error`);
      if (!input.validity.valid) {
        this._hideInputError(inputErrorMessage, input);
      }
    });
    this._disableButton();
  };
}
