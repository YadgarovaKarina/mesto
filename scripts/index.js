import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { config } from './constans.js';
import { FormValidator } from './FormValidator.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_edit-profile');
const popupAdd = document.querySelector('.popup_new-card');
const popupPhoto = document.querySelector('.popup_full-photo');

const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseAdd = document.querySelector('.popup__close-button_add');
const popupClosePhoto = document.querySelector('.popup__close-button_photo');

const profileName = document.querySelector('.profile__author');
const profileJob = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup__image-content');
const popupName = document.querySelector('.popup__description');

const formName = document.querySelector('.popup__form_profile');
const formNewPlace = document.querySelector('.popup__form_new');
const nameInput = document.querySelector('#popup__item-name');
const jobInput = document.querySelector('#popup__item-job');
const placeInput = document.querySelector('#popup__item-place');
const linkInput = document.querySelector('#popup__item-link');
const cardContainer = document.querySelector('.elements');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', closeMouse);
  document.addEventListener('keydown', closeEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('mousedown', closeMouse);
};

function closeEsc(e) {
  if (e.key === 'Escape') {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
};

function closeMouse(e) {
  const popupOpen = document.querySelector(".popup_opened");
  if (e.target === popupOpen) {
    closePopup(popupOpen);
  }
};

const formProfile = new FormValidator(config, formName);
formProfile.enableValidation();

const formAdd = new FormValidator(config, formNewPlace);
formAdd.enableValidation();

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formProfile.buttonEnable();
}
);

buttonAddCard.addEventListener('click', function () {
  openPopup(popupAdd);
  formAdd.buttonDisabled();
}
);

popupCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
}
);

popupCloseAdd.addEventListener('click', function () {
  closePopup(popupAdd);
}
);

popupClosePhoto.addEventListener('click', function () {
  closePopup(popupPhoto);
}
);

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile)
};

formName.addEventListener('submit', submitProfileForm);

function clickPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupName.textContent = name;
  openPopup(popupPhoto)
};

function createCard(name, link) {
  const data = { name, link };
  const card = new Card(data, '#card-template', clickPopup);
  return card.generateCard();
};

function renderCard(cardElement) {
  cardContainer.prepend(cardElement);
};

function submitAddPlace(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const cardElement = createCard(name, link);
  renderCard(cardElement);
  formNewPlace.reset();
  closePopup(popupAdd)
};

formNewPlace.addEventListener('submit', submitAddPlace);

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);
  renderCard(cardElement);
});

