const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonAddCardSubmit = document.querySelector('.popup__submit-button_create');
const buttonProfileSubmit= document.querySelector('.popup__submit-button_save');

const popup = document.querySelector('.popup');
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

const formName = document.querySelector('.popup__form');
const formNewPlace = document.querySelector('.popup__form_new');
const nameInput = document.querySelector('#form__item-name');
const jobInput = document.querySelector('#form__item-job');
const placeInput = document.querySelector('#form__item-place');
const linkInput = document.querySelector('#form__item-link');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', closeMouse);
  document.addEventListener('keydown', closeEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
};

function closeEsc(e) {
  const popupOpen = document.querySelector(".popup_opened");
  if (e.key === 'Escape') {
    closePopup(popupOpen);
  }
};

function closeMouse(e) {
  const popupOpen = document.querySelector(".popup_opened");
  if (e.target === popupOpen) {
    closePopup(popupOpen);
  }
};

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  buttonEnable(buttonProfileSubmit, config);
}
);

buttonAddCard.addEventListener('click', function () {
  openPopup(popupAdd);
  buttonDisabled(buttonAddCardSubmit, config);
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

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile)
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = name;
  cardElement.querySelector('.element__title').textContent = name;

  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    cardElement.remove('element');
  });

  cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
    popupImage.src = link;
    popupName.textContent = name;
    openPopup(popupPhoto)
  });

  return cardElement;
}

function renderCard(cardElement) {
  cardContainer.prepend(cardElement);
}

function formSubmitHandlerAddPlace(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const cardElement = createCard(name, link);
  renderCard(cardElement);
  formNewPlace.reset();
  closePopup(popupAdd)
}

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements');

initialCards.forEach(function (element) {
  const cardElement = createCard(element.name, element.link);
  renderCard(cardElement);
});

formName.addEventListener('submit', formSubmitHandler);
formNewPlace.addEventListener('submit', formSubmitHandlerAddPlace);
