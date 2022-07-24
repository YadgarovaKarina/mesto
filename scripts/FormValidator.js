export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    buttonDisabled() {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
        
    };

    buttonEnable() {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonDisabled();
        } else {
            this.buttonEnable();
        }
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);

                this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };

}