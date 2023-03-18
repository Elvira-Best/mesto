let popupElement = document.querySelector(".popup");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__job");
let popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
let popupEditButtonElement = document.querySelector(".profile__edit-button");
let formElement = popupElement.querySelector(".popup__form")

const openPopup = function () {
  popupElement.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

const closePopup = function () {
  popupElement.classList.remove("popup_opened");
}

/* Логика не применяется в этом спринте
const closePopupByClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
} */

popupEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
/* Логика не применяется в этом спринте
popupElement.addEventListener('click', closePopupByClickOverlay);*/


// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
