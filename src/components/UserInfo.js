export class UserInfo {
    //Принимает в конструктор элемент имени пользователя и элемент информации о себе.
  constructor({ profileName, profileDescription, profileAvatar}) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    //this._profileAvatar = document.querySelector(profileAvatar);
    this._profileAvatar = profileAvatar;
  }

  //Содержит публичный метод getUserInfo,
  // который возвращает объект с данными пользователя.
   //Этот метод пригодится, когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(item) {
    this._profileName.textContent = item.name;
    this._profileDescription.textContent = item.description;
    this._profileAvatar.src = item.avatar;
  }
}