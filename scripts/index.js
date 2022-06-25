const button = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_new-card');
const popupPhoto = document.querySelector('.popup_full-photo');

const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseAdd = document.querySelector('.popup__close-button_add');
const popupClosePhoto = document.querySelector('.popup__close-button_photo');


const formElement = document.querySelector('.popup__form');
const formNewPlace = document.querySelector('.popup__form_new');
const nameInput = document.querySelector('#form__item-name');
const jobInput = document.querySelector('#form__item-job');
const placeInput = document.querySelector('#form__item-place');
const linkInput = document.querySelector('#form__item-link');
const profileName = document.querySelector('.profile__author');
const profileJob = document.querySelector('.profile__description');


function openPopup() {
  popupProfile.classList.add('popup_opened');
  
}

function openAddPopup() {
  popupAdd.classList.add('popup_opened');
}

function openPhotoPopup() {
  popupPhoto.classList.add('popup_opened');
}

function closePopup() {
  popupProfile.classList.remove('popup_opened');
}

function closeAddPopup() {
  popupAdd.classList.remove('popup_opened');
}

function closePhotoPopup() {
  popupPhoto.classList.remove('popup_opened');
}


button.addEventListener('click', function () {
  openPopup();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
);

addButton.addEventListener('click', function () {
  openAddPopup();
}
);

popupCloseButton.addEventListener('click', function () {
  closePopup();
}
);

popupCloseAdd.addEventListener('click', function () {
  closeAddPopup();
}
);

popupClosePhoto.addEventListener('click', function () {
  closePhotoPopup();
}
);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup()
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
    const popupImage = document.querySelector('.popup__image-content');
    popupImage.src = link;
    const popupName = document.querySelector('.popup__description');
    popupName.textContent = name;
    openPhotoPopup()
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
  closeAddPopup()
}

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements');

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.name;
  cardElement.querySelector('.element__title').textContent = element.name;

  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    cardElement.remove('element');
  });

  cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
    const popupImage = document.querySelector('.popup__image-content');
    popupImage.src = element.link;
    const popupName = document.querySelector('.popup__description');
    popupName.textContent = element.name;
    openPhotoPopup()
  });

  cardContainer.append(cardElement);

});

formElement.addEventListener('submit', formSubmitHandler);
formNewPlace.addEventListener('submit', formSubmitHandlerAddPlace);
