const button = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#form__item-name');
const jobInput = document.querySelector('#form__item-job');
const profileName = document.querySelector('.profile__author');
const profileJob = document.querySelector('.profile__description');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}


button.addEventListener('click', function () {
    openPopup();
}
);

popupCloseButton.addEventListener('click', function () {
    closePopup()
}
);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);

