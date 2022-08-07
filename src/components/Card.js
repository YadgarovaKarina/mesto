export class Card {
  constructor(data, selector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
        .querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  } 

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const elementImg = this._element.querySelector('.element__image')
    this._element.querySelector('.element__title').textContent = this._title;
    elementImg.src = this._image;
    elementImg.alt = this._title;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-button_active');
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  }
};