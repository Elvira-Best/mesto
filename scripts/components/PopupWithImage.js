import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__image');
    this._captionElement = this._popup.querySelector('.popup__caption');
  }

  open = (cardData) => {
    this._imageElement.src = cardData.link;
    this._imageElement.alt = cardData.title;
    this._captionElement.textContent = cardData.title;
    super.open();
  }
}
