import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._confirmButton = this._popup.querySelector('.popup__submit-button_delete');
        this._confirmAction = () => { };
    }

    setConfirmAction(action) {
        this._confirmAction = action;
    }

    setEventListeners() {
        this._confirmButton.addEventListener('click', (evt) => {
            this._confirmAction();
        });
        super.setEventListeners();
    }
}