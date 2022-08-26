import { Api } from '../components/Api.js';
import { config } from '../utils/constans.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const avatarChangeBtn = document.querySelector('.profile__avatar-button');
const formName = document.querySelector('.popup__form_profile');
const formNewPlace = document.querySelector('.popup__form_new');
const formAvatar = document.querySelector('.popup__form_avatar');
const nameInput = document.querySelector('#popup__item-name');
const aboutInput = document.querySelector('#popup__item-job');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: 'b8918bb6-8c8c-461f-acb0-f8f8bf54b78b',
    'Content-Type': 'application/json'
  }
});

const formProfile = new FormValidator(config, formName);
formProfile.enableValidation();

const formAdd = new FormValidator(config, formNewPlace);
formAdd.enableValidation();

const formNewAvatar = new FormValidator(config, formAvatar);
formNewAvatar.enableValidation();

const popupPhoto = new PopupWithImage('.popup_full-photo');
popupPhoto.setEventListeners();

const configProfileSelector = {
  nameProfile: '.profile__author',
  aboutProfile: '.profile__description',
  avatarProfile: '.profile__avatar',
}

const newUser = new UserInfo(configProfileSelector);

buttonEditProfile.addEventListener('click', () => {
  popupProfile.open();
  formProfile.enableButton();
  handleProfile();
}
);

function handleProfile() {
  const { name, about } = newUser.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
};

buttonAddCard.addEventListener('click', function () {
  popupAdd.open();
  formAdd.disabledButton();
}
);

const submitProfileForm = (inputValues) => {
  popupProfile.addSaveProcess();
  api.editUserInfo(inputValues)
    .then((res) => {
      newUser.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupProfile.removeSaveProcess())
}

avatarChangeBtn.addEventListener('click', () => {
  popupAvatar.open();
  formNewAvatar.disabledButton();
});

const submitAvatar = (inputValues) => {
  popupAvatar.addSaveProcess();
  api.updateAvatar(inputValues)
    .then((res) => {
      newUser.setUserAvatar(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAvatar.removeSaveProcess())
}

const popupAvatar = new PopupWithForm('.popup_avatar', submitAvatar);
popupAvatar.setEventListeners();

const popupProfile = new PopupWithForm('.popup_edit-profile', submitProfileForm);
popupProfile.setEventListeners();

function handleCardClick({name, link}) {
  popupPhoto.open(name, link)
};

const createCard = (cardData) => {
  cardData.currentUser = newUser.getUserInfo();
  const card = new Card(cardData, '#card-template', {
    onClick: handleCardClick,
    onRemove: (currentCard, removeCard) => {
      popupDeleteCard.open();
      popupDeleteCard.setConfirmAction(() => {
        api.deleteCard(currentCard._id).then(() => {
          removeCard();
          popupDeleteCard.close();
        })
          .catch((err) => {
            console.log('Ошибка: ', err);
          });
      });
    },
    onLike: (currentCard, likeCallback) => {
      if (card.isLiked()) {
        api.deleteLike(currentCard._id).then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.log('Ошибка: ', err);
          });
      } else {
        api.addLike(currentCard._id).then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.log('Ошибка: ', err);
          });
      }
    }
  })
  return card.generateCard();
};

const popupDeleteCard = new PopupWithConfirmation('.popup_delete-card');
popupDeleteCard.setEventListeners();

const submitAddPlace = (inputValues) => {
  popupAdd.addSaveProcess();
  api.addNewCard(inputValues)
    .then((res) => {
      const cardElement = createCard(res);
      initialCardList.addItem(cardElement);
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAdd.removeSaveProcess())
}

const popupAdd = new PopupWithForm('.popup_new-card', submitAddPlace);
popupAdd.setEventListeners();

const initialCardList = new Section({
  renderer: (item) => {
    initialCardList.addItem(createCard(item));
  },
}, '.elements');

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, cards]) => {
    newUser.setUserInfo(userData);
    newUser.setUserAvatar(userData);
    initialCardList.renderItems(cards.slice().reverse());
  }, api)
  .catch((err) => {
    console.log(err);
  });