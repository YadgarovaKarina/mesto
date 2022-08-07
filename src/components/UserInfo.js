export class UserInfo {
  constructor({ nameProfile, jobProfile }) {
    this._nameProfile = document.querySelector(nameProfile);
    this._jobProfile = document.querySelector(jobProfile);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent,
    }
    return this._userInfo;
  }

  setUserInfo({ name, job }) {
    this._nameProfile.textContent = name;
    this._jobProfile.textContent = job;
  }
}
