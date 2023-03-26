const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupElements = document.querySelectorAll(".popup");
const popupEditProfileElement = document.querySelector(".popup_type_edit-profile");
const popupAddCardElement = document.querySelector(".popup_type_add-card");
const popupOpenImageElement = document.querySelector(".popup_type_image-open");
const popupCloseButtonElement = document.querySelectorAll(".popup__close-button");
const formProfileElement = popupEditProfileElement.querySelector(".popup__form");
const formCardElement = popupAddCardElement.querySelector(".popup__form");
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


// Создание карточки
function createCard (data) {
  const cardTemplate = document.querySelector(".post__template").content;
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
}

//Добавление карточек из масива
initialCards.forEach((card) => {
  const postElement = createCard(card);
  renderCard(postElement);
})

// Открытие закрытие попапа
function openPopup (popup) {
  popup.classList.add("popup_opened");
}

function closePopup (popup) {
  popup.classList.remove("popup_opened");
}

popupEditButtonElement.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfileElement);
});
popupAddButtonElement.addEventListener('click', () => openPopup(popupAddCardElement));

popupCloseButtonElement.forEach((closeButton) => {
  const closestPopup = closeButton.closest(".popup");
  closeButton.addEventListener('click', () => closePopup(closestPopup));
});

// Обработчик «отправки» формы редактирования профиля
formProfileElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfileElement);
});

// Обработчик «отправки» формы добавления карточки
formCardElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {name: titleInput.value, link: imageInput.value};
  const newPost = createCard(newCard);
  titleInput.value = ""
  imageInput.value = ""
  renderCard(newPost);
  closePopup(popupAddCardElement);
});







