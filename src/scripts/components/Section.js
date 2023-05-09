export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCards = items;
    this.renderer = renderer;
  }

  renderCard() {
    this._initialCards.forEach(element => {
      this.addItem(this.renderer(element))
    });
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }
}
