const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Функция, которая добавляет обработчик событий всем формам
function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
};

// Функция, которая добавляет обработчик событий всем полям ввода
function setEventListeners(form, {inputSelector, submitButtonSelector, ...rest}) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest.inputErrorClass, rest.errorClass);
      toggleButtonState(inputList, button, rest.inactiveButtonClass);
    });
  });
};

// Функция, которая проверяет валидность поля
function checkInputValidity(input, inputErrorClass, errorClass) {
  const inputErrorMessage = document.querySelector(`#${input.id}-input-error`);
  if (!input.validity.valid) {
    showInputError(input, inputErrorMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(input, inputErrorMessage, inputErrorClass, errorClass);
  }
};

// Функция, которая добавляет класс с ошибкой
function showInputError(input, inputErrorMessage, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  inputErrorMessage.textContent = input.validationMessage;
  inputErrorMessage.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(input, inputErrorMessage, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  inputErrorMessage.textContent = '';
  inputErrorMessage.classList.remove(errorClass);
};

// Функция, которая переключает класс с ошибкой для кнопки
function toggleButtonState(inputList, button, inactiveButtonClass) {
  if (hasInValidInput(inputList)) {
    disableButton(button, inactiveButtonClass);
  } else {
    enableButton(button, inactiveButtonClass);
  }
};

// Функция, которая проверяет наличие полей с неправильным вводом
function hasInValidInput(inputList) {
  return Array.from(inputList).some((input) => !input.validity.valid);
};

// Функция, которая делает кнопку активной
function enableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute("disabled");
};

// Функция, которая делает кнопку неактивной
function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute("disabled", true);
};

enableValidation(validationConfig)

//Сброс ошибок при открытии попапов
function errorsReset(form) {
  const inputElements = form.querySelectorAll(validationConfig.inputSelector);
  inputElements.forEach((input) => {
    const inputErrorMessage = document.querySelector(`#${input.id}-input-error`);
    if (!input.validity.valid) {
      hideInputError(input, inputErrorMessage, validationConfig.inputErrorClass, validationConfig.errorClass)
    }
  });
};
