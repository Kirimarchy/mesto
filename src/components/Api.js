//получить список всех карточек в виде массива (GET)
//добавить карточку (POST)
//удалить карточку (DELETE)
//получить данные пользователя (GET)
//заменить данные пользователя (PATCH)
//заменить аватар (PATCH)
//“залайкать” карточку (PUT)
//удалить лайк карточки (DELETE)

export class Api {
    constructor({baseUrl, address, token}) {
        this._baseUrl = baseUrl;
        this._address = address;
        this._token = token;
    }

//обработчик ответа
    _getResponse(res) {
        if (res.ok) {
            return res.json();//разбирает ответ как JSON;
        }
        return Promise.reject(`Error ${res.status}`);
     }

    // получение данных профиля с сервера
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(this._getResponse);
    }

//метод получения карточек с сервера

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponse)
    }

    // добавление карточки
    postNewCard(item) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: item.name,
                link: item.link,
            }),
        }).then(this._getResponse);
    }

    // поменять аватар
    patchNewAvatar(item) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: item.avatar,
            }),
        }).then(this._getResponse);
    }

    // редактирование профиля
    patchUserProfile(item) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: item.userName, about: item.userJob}),
        }).then(this._getResponse);
    }

    // добавление лайка
    likeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: "PUT",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(this._getResponse);
    }

    // удаление лайка
    unlikeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(this._getResponse);
    }

    // удаление карточки
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(this._getResponse);
    }
}