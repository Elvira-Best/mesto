export default class Card {
  constructor(cardData, templateSelector, openImagePopup) {
    this._cardData = cardData;
    this._cardLink = cardData.link;
    this._cardName = cardData.name;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  // клонирование template-элемента
  _getTemplate () {
    return document.querySelector(this._templateSelector).content.querySelector('.post').cloneNode(true);
  }

  _likeToggle = () => {
    this._likeButtonElement.classList.toggle('post__like-button_active');
  }

  _deleteCard = () => {
    this._cardClone.remove();
  }

  _openImage = () => {
    this._openImagePopup(this._cardData);
  }

  // устанавливаем слушатели событий
  _setEventListeners () {
    this._likeButtonElement.addEventListener('click', this._likeToggle);
    this._deleteButtonElement.addEventListener('click', this._deleteCard);
    this._imageElement.addEventListener('click', this._openImage);
  }

  // создание карточки
  createCard () {
    this._cardClone = this._getTemplate();
    this._imageElement = this._cardClone.querySelector('.post__image');
    this._titleElement = this._cardClone.querySelector('.post__title');
    this._deleteButtonElement = this._cardClone.querySelector('.post__delete-button');
    this._likeButtonElement = this._cardClone.querySelector('.post__like-button');
    this._imageElement.src = this._cardLink;
    this._imageElement.alt =  this._cardName;
    this._titleElement.textContent = this._cardName;
    this._setEventListeners();
    return this._cardClone
  }
}
