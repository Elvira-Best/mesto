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
const postsElement = document.querySelector(".posts");
const cardTemplate = document.querySelector(".post__template").content;

const submitButtonEditProfile = formProfileElement.querySelector(".popup__save-button");
const submitButtonAddCard = formCardElement.querySelector(".popup__save-button");
const editProfileInputList = formProfileElement.querySelectorAll(".popup__input");

// Создание карточки, действия с карточками
function createCard (data) {
  const postElement = cardTemplate.querySelector(".post").cloneNode(true);
  const imageElement = postElement.querySelector(".post__image");
  const deleteButtonElement = postElement.querySelector(".post__delete-button");
  const likeButtonElement = postElement.querySelector(".post__like-button");
  imageElement.src = data.link;
  imageElement.alt = data.name;
  postElement.querySelector(".post__title").textContent = data.name;

  likeButtonElement.addEventListener('click', () => likeButtonElement.classList.toggle("post__like-button_active")); // Ставим/убираем лайк
  deleteButtonElement.addEventListener('click', () => deleteButtonElement.closest(".post").remove()); // Удаление карточки
  // Открытие попапа с фото
  imageElement.addEventListener('click', () => {
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupCaptionElement.textContent = data.name;
    openPopup(popupOpenImageElement);
  })

  return postElement;
};

//Добавление карточки в верстку
function renderCard (card) {
  postsElement.prepend(card);
};

//Добавление карточек из масива
initialCards.forEach((card) => {
  const postElement = createCard(card);
  renderCard(postElement);
});

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

//Открытие попапа редактирования профиля
popupEditButtonElement.addEventListener('click', () => {
  errorsReset(formProfileElement);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  toggleButtonState(editProfileInputList, submitButtonEditProfile, validationConfig.inactiveButtonClass); // по заданию кнопка активна при открытии попапа, для неактивной перенести toogle
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
  errorsReset(formCardElement);
  openPopup(popupAddCardElement);
});

// Обработчик «отправки» формы добавления карточки
formCardElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {name: titleInput.value, link: imageInput.value};
  const newPost = createCard(newCard);
  renderCard(newPost);
  disableButton(submitButtonAddCard, validationConfig.inactiveButtonClass);
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
