export default class UserInfo {
  constructor(userInfoConfig) {
    this._nameElement = document.querySelector(userInfoConfig.nameSelector);
    this._jobElement = document.querySelector(userInfoConfig.jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.job;
  }
}
