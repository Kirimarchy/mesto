export class UserInfo {
    //Принимает в конструктор элемент имени пользователя и элемент информации о себе.
  constructor({ profileName, profileDescription, profileAvatar}) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  //Содержит публичный метод getUserInfo,
  // который возвращает объект с данными пользователя.
   //Этот метод пригодится, когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
      //avatar: this._profileAvatar
    };
  }

  // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(item) {
    this._name.textContent = item.name;
    this._description.textContent = item.description;
  }

setUserAvatar(item) {
  this._avatar.src = item.avatar;
}
}