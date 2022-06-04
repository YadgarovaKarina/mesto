const button = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__content-submit-button');
const formElement = document.querySelector('.popup__content');
const nameInput = document.querySelector('.popup__content-form-name');
const jobInput = document.querySelector('.popup__content-form-job');
const profileName = document.querySelector('.profile__author');
const profileJob = document.querySelector('.profile__description');


function openPopup() {
    popup.classList.remove('popup_hidden');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.add('popup_hidden');
}


button.addEventListener('click', function () {
    openPopup();
}
);

popupCloseButton.addEventListener('click', function () {
    closePopup()
}
);

popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup()
    }
}
);


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);

