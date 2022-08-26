export class UserInfo {
  constructor(config) {
    this._data = {};
    this._name = document.querySelector(config.nameProfile);
    this._about = document.querySelector(config.aboutProfile);
    this._avatar = document.querySelector(config.avatarProfile);
  }

  getUserInfo() {
    return this._data;
  } 

  setUserInfo(userData) {
    this._data = userData;
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
  }

  setUserAvatar(userData){
    this._data.avatar = userData.avatar;
    this._avatar.src = userData.avatar;
  }
}