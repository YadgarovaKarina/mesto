export class Card {
  constructor(data, selector, clickPopup) {
    this._title = data.name;
    this._image = data.link;
    this._selector = document.querySelector('#card-template').content;
    this._clickPopup = clickPopup;
  }

  _getTemplate() {
    const cardElement = this._selector.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-button_active');
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._clickPopup(this._title, this._image);
    });
  }
};