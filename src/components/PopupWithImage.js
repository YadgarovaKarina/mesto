import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__image-content');
    this._popupImgName = this._popup.querySelector('.popup__description');
    super.setEventListeners();
  }

  open(name, link) {
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupImgName.textContent = name;
    super.open();
  }
}