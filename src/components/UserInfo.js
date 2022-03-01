export class UserInfo {
    //Принимает в конструктор элемент имени пользователя и элемент информации о себе.
  constructor({ profileName, profession }) {
    this._profileName = profileName;
    this._profession = profession;
  }

  //Содержит публичный метод getUserInfo,
  // который возвращает объект с данными пользователя.
   //Этот метод пригодится, когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profession.textContent,
    };
  }

  // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, description) {
    this._profileName.textContent = name;
    this._profession.textContent = description;
  }
}