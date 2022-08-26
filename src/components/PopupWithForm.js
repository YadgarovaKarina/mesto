import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, handleFormSubmit) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._formInputList = Array.from(this._form.querySelectorAll('.popup__form-input'));
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._formValues = {};
        this._formInputList.forEach(input => {
            this._formValues[input.name] = input.value
        });
        return this._formValues;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    addSaveProcess() {
        this._form.querySelector('.popup__submit-button').textContent = 'Сохранение...';
    }

    removeSaveProcess() {
        this._form.querySelector('.popup__submit-button').textContent = 'Сохранить';
    }

}