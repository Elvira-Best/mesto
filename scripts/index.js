import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupElements = document.querySelectorAll(".popup");
const popupEditProfileElement = document.querySelector(".popup_type_edit-profile");
const popupAddCardElement = document.querySelector(".popup_type_add-card");
const popupOpenImageElement = document.querySelector(".popup_type_image-open");
const formProfileElement = document.forms["profile-form"];
const formCardElement = document.forms["card-form"];
const popupEditButtonElement = document.querySelector(".profile__edit-button");
const nameInput = popupEditProfileElement.querySelector(".popup__input_type_name");
const jobInput = popupEditProfileElement.querySelector(".popup__input_type_job");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const popupAddButtonElement = document.querySelector(".profile__add-button");
const titleInput = popupAddCardElement.querySelector(".popup__input_type_title");
const imageInput = popupAddCardElement.querySelector(".popup__input_type_image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaptionElement = document.querySelector(".popup__caption");
const postElement = document.querySelector(".posts");
const templateSelector = '.post__template';

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Создание экземпляров класса FormValidator, валидация форм
const profileValidatorForm = new FormValidator(validationConfig, formProfileElement);
profileValidatorForm.enableValidation();
const postValidatorForm = new FormValidator(validationConfig, formCardElement);
postValidatorForm.enableValidation();

//Добавление карточки в верстку
function renderCard (container, card) {
  container.prepend(card);
};

//Добавление карточек из масива
initialCards.forEach(element => {
  renderCard(postElement, createNewCard(element));
});

// Добавление новой карточки
function createNewCard (element) {
  const card = new Card(element, templateSelector, openImagePopup);
  const cardElement = card.createCard();
  return cardElement;
};

// Функция открытия попапа
function openPopup (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
};

// Функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc);
};

// Открытие попапа с фото
function openImagePopup (cardData) {
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaptionElement.textContent = cardData.name;
  openPopup(popupOpenImageElement);
}

//Открытие попапа редактирования профиля
popupEditButtonElement.addEventListener('click', () => {
  formProfileElement.reset();
  profileValidatorForm.errorsReset();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfileElement);
});

// Обработчик «отправки» формы редактирования профиля
formProfileElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfileElement);
});

//Открытие попапа добавления карточки
popupAddButtonElement.addEventListener('click', () => {
  formCardElement.reset();
  postValidatorForm.errorsReset();
  openPopup(popupAddCardElement);
});

// Обработчик «отправки» формы добавления карточки
formCardElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCardData = {name: titleInput.value, link: imageInput.value};
  renderCard(postElement, createNewCard(newCardData));
  closePopup(popupAddCardElement);
});

//Закрытие попапов кликом на крестик и оверлей
popupElements.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup)
    };
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup)
    };
  });
});

//Закрытие попапов нажатием на Esc
function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpenedCurrently = document.querySelector(".popup_opened");
    closePopup(popupOpenedCurrently);
  };
};
