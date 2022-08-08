import { initialCards, config } from '../utils/constans.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import './index.css';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupCloseAdd = document.querySelector('.popup__close-button_add');
const popupClosePhoto = document.querySelector('.popup__close-button_photo');
const popupCloseButton = document.querySelector('.popup__close-button');

const popupImage = document.querySelector('.popup__image-content');
const popupName = document.querySelector('.popup__description');

const formName = document.querySelector('.popup__form_profile');
const formNewPlace = document.querySelector('.popup__form_new');

const nameInput = document.querySelector('#popup__item-name');
const jobInput = document.querySelector('#popup__item-job');
const cardContainer = document.querySelector('.elements');

const formProfile = new FormValidator(config, formName);
formProfile.enableValidation();

const formAdd = new FormValidator(config, formNewPlace);
formAdd.enableValidation();

const popupPhoto = new PopupWithImage('.popup_full-photo');
popupPhoto.setEventListeners();

const profileUser = {
  nameProfile: '.profile__author',
  jobProfile: '.profile__description',
}

const newUser = new UserInfo(profileUser);

buttonEditProfile.addEventListener('click', () => {
  popupProfile.open();
  formProfile.buttonEnable();
  handleProfile();
}
);

function handleProfile() {
  const {name, job} = newUser.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
}; 

buttonAddCard.addEventListener('click', function () {
  popupAdd.open();
  formAdd.buttonDisabled();
}
);

popupCloseButton.addEventListener('click', function () {
  popupProfile.close();
}
);

popupCloseAdd.addEventListener('click', function () {
  popupAdd.close();
}
);

popupClosePhoto.addEventListener('click', function () {
  popupPhoto.close();
}
);

function addCard(cardElement) {
  cardContainer.prepend(cardElement);
}

const submitProfileForm = (formData) => {
  newUser.setUserInfo(formData);
  popupProfile.close();
};

const popupProfile = new PopupWithForm('.popup_edit-profile', submitProfileForm);
popupProfile.setEventListeners();

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupName.textContent = name;
  popupPhoto.open(name, link)
};

function createCard(name, link) {
  const data = { name, link };
  const card = new Card(data, '#card-template', handleCardClick);
  return card.generateCard();
};

function submitAddPlace(inputsData) { 
  const cardElement = createCard(inputsData.name, inputsData.link); 
  addCard(cardElement, cardContainer);
  formNewPlace.reset();
  popupAdd.close();
}; 

const popupAdd = new PopupWithForm('.popup_new-card', submitAddPlace);
popupAdd.setEventListeners();

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    initialCardList.addItem(createCard(item.name, item.link));
  },
}, '.elements');

initialCardList.renderItems();