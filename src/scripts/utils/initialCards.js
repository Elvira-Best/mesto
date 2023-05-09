const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const userInfoConfig = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
}

const popupEditButtonElement = document.querySelector(".profile__edit-button");
const popupAddButtonElement = document.querySelector(".profile__add-button");

const imagePopupSelector = '.popup_type_image-open'
const popupProfileSelector = '.popup_type_edit-profile';
const popupAddCardSelector = '.popup_type_add-card';
const postElement = '.posts';
const templateSelector = '.post__template';

const formProfileElement = document.forms["profile-form"];
const formCardElement = document.forms["card-form"];


export {
  initialCards,
  validationConfig,
  userInfoConfig,
  popupEditButtonElement,
  popupAddButtonElement,
  imagePopupSelector,
  popupProfileSelector,
  popupAddCardSelector,
  postElement,
  templateSelector,
  formProfileElement,
  formCardElement
}
