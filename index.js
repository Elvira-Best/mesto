import {
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
} from "./scripts/utils/initialCards.js";
import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";

// Создание экземпляров классов UserInfo, отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo(userInfoConfig);

// Попаа с изображением
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners()

// Создание экземпляров классов Section, отвечает за отрисовку элементов на странице
const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, templateSelector, imagePopup.open);
    return card.createCard();
  }
}, postElement)
section.renderCard()

// Создание экземпляров класса FormValidator, валидация форм
const profileValidatorForm = new FormValidator(validationConfig, formProfileElement);
profileValidatorForm.enableValidation();
const postValidatorForm = new FormValidator(validationConfig, formCardElement);
postValidatorForm.enableValidation();

// Попапы с формами, создание экземпляров классов
const profileEditPopup = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(profileEditPopup.getInputValues());
  profileEditPopup.close();
})
profileEditPopup.setEventListeners()

const addCardPopup = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(addCardPopup.getInputValues()));
  addCardPopup.close();
})
addCardPopup.setEventListeners()

//Открытие попапа редактирования профиля
popupEditButtonElement.addEventListener('click', () => {
  profileValidatorForm.resetErrors();
  profileEditPopup.setInputValues(userInfo.getUserInfo())
  profileEditPopup.open()
});

//Открытие попапа добавления карточки
popupAddButtonElement.addEventListener('click', () => {
  postValidatorForm.resetErrors();
  addCardPopup.open()
});

