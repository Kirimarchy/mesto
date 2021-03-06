export default class Section {
    //items — это массив данных,
    //которые нужно добавить на страницу при инициализации класса.
    // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    constructor({items, renderer}, container) {
        this._renderer = renderer;
        this._items = items;
        this._container = container;//CSS-селектор контейнера. В него мы будем вставлять элементы разметки
    }

    //Содержит публичный метод, который отвечает за отрисовку всех элементов.
    renderItems() {
        this._items.forEach((item) => {
            this.addItem(item);
        });
    }

    //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер
    // получает разметку через функцию-колбэк и вставляет её в контейнер.
    //Публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер / в конец.
    //создает карточку и тут же вставляет ее в DOM
    addItem(item) {
        this._container.append(this._renderer(item));
    }

    //Добавляем карточку в начало массива
    prependItem(item) {
        this._container.prepend(this._renderer(item));
    }
}